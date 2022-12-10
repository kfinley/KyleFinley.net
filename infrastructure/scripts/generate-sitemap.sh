#!/bin/bash

get_meta_tag() {
  local value=$(PROPERTY_NAME=$1 jq '.metaTags[] | select(.property==env.PROPERTY_NAME) | .content' $2)
  value=`sed -e 's/^"//' -e 's/"$//' <<<"$value"`
  echo $value
}

create_url() {
  file="${2/json/md}"
  if [ ! -f "$file" ]; then
    file="${2/json/vue}"
  fi

  local last_mod=$(get_meta_tag "article:modified_time" $2)

  if [ "$last_mod" = "" ]; then
    last_mod=$(date -r $file "+%Y-%m-%d")
  fi

  parts=($last_mod) # if the date string has time we just want the first segment which is the date
  last_mod=${parts[0]}

  if [[ "$last_mod" == *"/"* ]]; then
    last_mod=$(date -j -f '%m/%d/%Y' "$last_mod" +'%Y-%m-%d')
  fi

  local url=$(get_meta_tag "og:url" $2)
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
