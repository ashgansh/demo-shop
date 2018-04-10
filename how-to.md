Creation of new repo
1. create a new repo
2. select option to import old project and copy paste url

Pointing to the new repo
`git remote rename origin public`
`git remote set-url public [NEW_URL]`

Work as usual

Syncing the repo
`git pull master`
`git push public master`
