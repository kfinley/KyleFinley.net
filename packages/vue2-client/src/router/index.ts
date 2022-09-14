import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Articles from "../articles";
import { metaFiles } from '../articles';
import { createRouterLayout } from 'vue-router-layout'
import { RouteNames } from './RouteNames';

// Setup Layouts
const RouterLayout = createRouterLayout(layout => {
  return import('../layouts/Layout' + layout.charAt(0).toUpperCase() + layout.slice(1) + '.vue')
})

const LayoutArticle = createRouterLayout(layout => {
  return import('../layouts/LayoutArticle.vue');
});

Vue.use(VueRouter);

const viewsMeta = import.meta.glob('../views/*.json')

export const createRouter = async () => {

  const routes: Array<RouteConfig> = [

    //TODO: Not working... look into it later.
    // {
    //   path: '',
    //   component: RouterLayout,
    //   children: [
    //     {
    //       path: '/',
    //       name: RouteNames.Home,
    //       component: Home,
    //       meta: viewsMeta[`../views/Home.json`] ? (await viewsMeta[`../views/Home.json`]() as any).default : { allowAnonymous: true }
    //     },
    //     {
    //       path: '/contact',
    //       name: RouteNames.Contact,
    //       component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
    //       meta: viewsMeta[`../views/Contact.json`] ? (await viewsMeta[`../views/Contact.json`]() as any).default : { allowAnonymous: true }
    //     },
    //     {
    //       path: "/news",
    //       name: RouteNames.News,
    //       component: () => import(/* webpackChunkName: "News" */ '@/views/News.md'),
    //       meta: viewsMeta['../views/News.json'] ? (await viewsMeta['../views/News.json']() as any).default : { allowAnonymous: true },
    //     },
    //     {
    //       path: "/articles",
    //       name: RouteNames.Articles,
    //       component: () => import(/* webpackChunkName: "articles" */ '../views/Articles.vue'),
    //       meta: viewsMeta['../views/Articles.json'] ? (await viewsMeta['../views/Articles.json']() as any).default : { allowAnonymous: true },
    //     }
    //   ],
    // },

    {
      path: "/",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: RouteNames.Home,
          component: Home,
          meta: viewsMeta[`../views/Home.json`] ? (await viewsMeta[`../views/Home.json`]() as any).default : { allowAnonymous: true }
        }
      ],
    },
    {
      path: "/contact",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: RouteNames.Contact,
          component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
          meta: viewsMeta[`../views/Contact.json`] ? (await viewsMeta[`../views/Contact.json`]()).default : { allowAnonymous: true }
        }
      ],
    },
    {
      path: "/news",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: RouteNames.News,
          component: () => import(/* webpackChunkName: "News" */ '../views/News.md'),
          meta: viewsMeta['../views/News.json'] ? (await viewsMeta['../views/News.json']()).default : { allowAnonymous: true },
        }
      ],
    },
    {
      path: "/articles",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: RouteNames.Articles,
          component: () => import(/* webpackChunkName: "articles" */ '../views/Articles.vue'),
          meta: viewsMeta['../views/Articles.json'] ? (await viewsMeta['../views/Articles.json']()).default : { allowAnonymous: true },
        }
      ],
    },
  ];

  //TODO: This works but is pretty dumb b/c it downloads each file just to load the site

  // const articlesMeta = import.meta.glob('../articles/*.json')

  const getMetaData = async (file: string) => {
    return (await metaFiles[file]() as any).default
  }

  for (const article of Object.keys(Articles)) {
    try {
      const file = Articles[article];

      // console.log(Articles[article])
      routes.push({
        path: `/${article}`,
        component: RouterLayout,
        children: [
          {
            path: '',
            component: LayoutArticle,
            children: [
              {
                path: '',
                name: article,
                component: () => import(/* @vite-ignore webpackChunkName: "[request]" */ `${file}.md`)
              }
            ],
            meta: await getMetaData(`../articles/${article}.json`),
          }
        ],
        meta: { allowAnonymous: true },
      })
      // console.log(`Created route for article at path /${article}`)
    } catch (e) {
      console.log(e)
    }
  }

  const router = new VueRouter({
    mode: "history",
    base: "/", // process.env.BASE_URL,
    routes,
  });

  // This callback runs before every route change, including on page load.
  router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
    // `/nested`'s will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) {
      document.title = nearestWithTitle.meta.title;
    } else if (previousNearestWithMeta) {
      document.title = previousNearestWithMeta.meta.title;
    }

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => {
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    });

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map((tagDef: any) => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    })
      // Add the meta tags to the document head.
      .forEach((tag: any) => document.head.appendChild(tag));

    next();
  });

  return router;

}
