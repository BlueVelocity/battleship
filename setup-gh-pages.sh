#!/bin/sh
if [ -z "$1" ]; then
  echo "Which folder do you want to deploy to GitHub Pages?"
  exit 1
elif [[ -n $(git ls-remote --heads origin "gh-pages") ]]; then
  echo "Remote branch exists! Check if package.json has a gh-pages script"
  exit 1
fi

sed -i /$1/d  ./.gitignore
sed -i "/\"scripts\": {/a\    \"gh-pages\": \"git subtree push --prefix $1 origin gh-pages\"," ./package.json
git add .
git commit -m "Update .gitignore and package.json for github pages"
git add dist && git commit -m "Initial dist subtree commit"
git subtree push --prefix $1 origin gh-pages

#To use this script, pass the folder you want to deploy as an argument
