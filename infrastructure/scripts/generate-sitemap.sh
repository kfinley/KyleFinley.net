#!/bin/bash

create_url() {
  file="${2/json/md}"
  if [ ! -f "$file" ]; then
    file="${2/json/vue}"
  fi
  local last_mod=$(date -r $file "+%Y-%m-%d")
  local url=$(jq '.metaTags[] | select(.property=="og:url") | .content' $2)
  cat >>$1 <<EOF
  <url>
    <loc>$url</loc>
    <lastmod>$last_mod</lastmod>
  </url>
EOF
}

cat >$1 <<EOF
<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
EOF

for file in packages/vue2-client/src/views/*.json; do
  create_url $1 $file
done

for file in packages/vue2-client/src/articles/*.json; do
  create_url $1 $file
done

cat >>$1 <<EOF
</urlset>
EOF
