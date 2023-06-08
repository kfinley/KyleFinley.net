# Ignore DS_Store and Icon files in GIT on Mac OSX

#### Just a simple trick to ignore DS_Store and Icon system files globally for GIT repositories on Mac OSX.

_<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author">Kyle Finley</span> Published: <time itemprop="pubdate" datetime="2/26/2023">
Saturday, December 26, 2015</time></div>_

---

### GIT Tip for Mac OSX
I've been moving to developing more on my Mac instead of under Windows and wanted to share this little tip for those that might need it. Mac has hidden files like any other OS and a few that seem to creep into GIT repositories are DS_Store and the Icon file for a folder. These can be ignored for all your GIT repositories using the following command.

    >> printf ".DS_Store\nIcon\r\r" > ~/.gitignore_global
    >> git config --global core.excludesfile ~/.gitignore_global

If you already have a GIT ignore file and want to add to it instead of overwrite it make sure you use ">>" instead of ">".
