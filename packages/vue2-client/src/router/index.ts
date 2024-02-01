import Vue from "vue";
import VueRouter, { RawLocation, Route, RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Articles from "../articles";
import { createRouterLayout } from 'vue-router-layout'
import { RouteNames } from './RouteNames';
import { defineAsyncComponent } from 'vue'

// Setup Layouts
const RouterLayout = createRouterLayout(layout => {
  return import('../layouts/Layout' + layout.charAt(0).toUpperCase() + layout.slice(1) + '.vue')
})

const LayoutArticle = createRouterLayout(layout => {
  return import('../layouts/LayoutArticle.vue');
});

Vue.use(VueRouter);

// ht: https://stackoverflow.com/a/67102038
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: RawLocation): Promise<Route> {
  return new Promise((resolve, reject) => {
    originalPush.call(this, location, () => {
      // on complete

      resolve(this.currentRoute);
    }, (error) => {
      // on abort

      // only ignore NavigationDuplicated error
      if (error.name === 'NavigationDuplicated' ||
        error.message.startsWith('Navigation cancelled')) {
        resolve(this.currentRoute);
      } else {
        reject(error);
      }
    });
  });
};

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
      path: "/songbook",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: RouteNames.SongBook,
          component: () => import(/* webpackChunkName: "Music" */ '../views/SongBook.vue'),
        }
      ],
    },
    {
      path: "/login",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import(/* webpackChunkName: "auth" */ '../views/Login.vue'),
        }
      ],
    },
    {
      path: "/github_auth_callback",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: 'github_auth_callback',
          component: () => import(/* webpackChunkName: "auth" */ '../views/GitHubAuthCallback.vue'),
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
      path: "/couchsurfing",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: "CoucheSurfing",
          component: () => import(/* webpackChunkName: "CouchSurfing" */ '../views/CouchSurfing.vue'),
          meta: viewsMeta[`../views/CouchSurfing.json`] ? (await viewsMeta[`../views/CouchSurfing.json`]()).default : { allowAnonymous: true }
        }
      ],
    },
    {
      path: "/media",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: RouteNames.Media,
          component: () => import(/* webpackChunkName: "Media" */ '../views/Media.vue'),
          meta: viewsMeta['../views/Media.json'] ? (await viewsMeta['../views/Media.json']()).default : { allowAnonymous: true },
        }
      ],
    },
    {
      path: "/music",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: RouteNames.Music,
          component: () => import(/* webpackChunkName: "Music" */ '../views/Music.vue'),
          meta: viewsMeta['../views/Music.json'] ? (await viewsMeta['../views/Music.json']()).default : { allowAnonymous: true },
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
      path: "/software",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: RouteNames.Software,
          component: () => import(/* webpackChunkName: "Software" */ '../views/Software.md'),
          meta: viewsMeta['../views/Software.json'] ? (await viewsMeta['../views/Software.json']()).default : { allowAnonymous: true },
        }
      ],
    },
    {
      path: "/travel",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: RouteNames.Travel,
          component: () => import(/* webpackChunkName: "Travel" */ '../views/Travel.md'),
          meta: viewsMeta['../views/Travel.json'] ? (await viewsMeta['../views/Travel.json']()).default : { allowAnonymous: true },
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
    {
      path: "/manage-repo",
      component: RouterLayout,
      children: [
        {
          path: '',
          name: 'Manage-Repo',
          component: () => import(/* webpackChunkName: "github" */ '../views/ManageRepo.vue'),
          meta: { allowAnonymous: true }
        }
      ]
    }
  ];

  for (const article of Object.keys(Articles)) {
    try {
      // console.log(article);
      const articlePathParts = article.split('/')
      let articleComponent;
      let articleJson = '';
      if (articlePathParts.length === 1) {
        articleJson = `../articles/${articlePathParts[0]}.json`;
        articleComponent = defineAsyncComponent(() => import(/* @vite-ignore */ /* webpackChunkName: "[request]" */ `../articles/${articlePathParts[0]}.md`))
      }
      if (articlePathParts.length === 2) {
        articleJson = `../articles/${articlePathParts[0]}/${articlePathParts[1]}.json`
        articleComponent = defineAsyncComponent(() => import(/* @vite-ignore */ /* webpackChunkName: "[request]" */ `../articles/${articlePathParts[0]}/${articlePathParts[1]}.md`))
      }
      routes.push({
        path: `/${article}`,
        component: RouterLayout,
        children: [
          {
            path: '',
            component: LayoutArticle,
            meta: viewsMeta[articleJson] ? (await viewsMeta[articleJson]() as any).default : { allowAnonymous: true },
            children: [
              {
                path: '',
                name: article,
                component: articleComponent,
              }
            ],
          }
        ],
        // meta: { allowAnonymous: true },
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
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  });

  const getMetaData = async (file: string) => {
    //TODO: fix this dumb shit...
    // console.log(file)
    // This is a shitty hack to make nested paths for dynamic imports work b/c of an issue in Vite
    // https://github.com/vitejs/vite/issues/4945
    const pathParts = file.split('/')
    switch (file) {
      case "Home":
      case "Articles":
      case "Media":
      case "Music":
      case "Software":
      case "SongBook":
      case "Travel":
      case "News":
      case "Contact":
      case "Login":
        return (await import(`../views/${pathParts[0]}.json`)).default
      default: {
        if (pathParts.length === 1) {
          return (await import(`../articles/${pathParts[0]}.json`)).default
        }
        if (pathParts.length === 2) {
          return (await import(`../articles/${pathParts[0]}/${pathParts[1]}.json`)).default
        }
      }
    }
  }

  // This callback runs before every route change, including on page load.
  router.beforeEach((to, from, next) => {
    try {
      // Get meta info for the route
      getMetaData(to.name as string).then((meta) => {
        document.title = meta.title

        meta.metaTags.map((tagDef: any) => {
          let tag = document.querySelector((`meta[${Object.keys(tagDef)[0]}='${tagDef[Object.keys(tagDef)[0]]}']`))

          if (!tag) {
            tag = document.createElement('meta');
            document.head.appendChild(tag)
          }

          Object.keys(tagDef).forEach(key => {
            tag!.setAttribute(key, tagDef[key]);
          });

        });
        next();
      });
    } catch (e) {
      console.log(e);
      next();
    }
  });

  router.afterEach((to, from) => {
    setTimeout(() => {
      try {
        try {
          // Do we still need this???
          document.querySelectorAll('img').forEach((i) => {
            console.log(i)
            i.src = i.src.replace('media', 'img/media')
          })
        }
        catch (e) {
          console.log(e);
        }

        Array.from(Array.from(document.getElementsByTagName('main'))[0].querySelectorAll('main a:not(a[href*="http"])')).map((link) => {
          // console.log(link)
          link.addEventListener(
            'click',
            function (e) {

              e.preventDefault()
              e.stopPropagation()
              router.push({ path: (link as any).href.split(window.location.host)[1] })
            },
            false
          )
        })

        Array.from(document.querySelectorAll('div > p')).map((p) => {
          // Remove indent for any paragraphs that are 2 lines or less.
          if (p.clientHeight <= 50) {
            (p as any).style['text-indent'] = '0'
          }
        })
      } catch (e) {
        console.log(e);
      }
    }, 50)

  });

  return router;

}
