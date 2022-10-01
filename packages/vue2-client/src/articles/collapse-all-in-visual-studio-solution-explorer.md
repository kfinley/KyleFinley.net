# Collapse All Folders in VS Solution Explorer
#### This is a Macro for Visual Studio that will collapse all the folders in the solution explorer.

*<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author"><a href="https://twitter.com/kfinley" target="_blank" title="kfinley on Twitter">Kyle Finley</a></span> Published: <time itemprop="pubdate" datetime="2/3/2006 1:34:00 AM">Thursday, February 2, 2006</time></div>*

---

UPDATE: Now working in Visual Studio 2005 (not yet tested in 2008)

Here is a little macro I've been using for a while that I have honestly don't think I could live without at this point. One the most annoying things while working within a large solution in visual studio is how the solution tree can get expanded to the point that you waste time trying to either collapse folders or visually dig through the projects in order to find a file. I typically have lots of files open from projects within a solution and at times I like to just do a mental refresh and close all the open files I have. That's great except that I'm still starring at most of the files and folders in the solution explorer. With this macro added to Visual Studio all I have to do is click a button and every folder and it's child folders collapse in the explorer.

I'm not the first person to come up with something like this. The original code for this macro came from the article CollapseAll Macro for Visual Studio .NET found on The Code Project. I made modifications to the code so it would collapse all the folders in a project, not just the root project folder. It isn't super fast for large solutions / projects but it works. One minor issue in the macro is that the folder icons don't get updated when the node is closed. Not a big deal to me but just wanted to point that out.

Unfortunately the code doesn't work with the new solution folders in Visual Studio 2005. If your project doesn't include any solution folders it works fine. I'll have an updated version posted once I get the fix done. If anyone else solves the problem let me know.

Update:  There is a bug in Visual Studio 2005 around solution folders that prevents the Expanded property from retaining the value you give it.  In order to get it to work correctly I had to add a block to the CollapseMe method.  I got the tip from the MSDN forum.  Funny how many of these macros are floating around the web.

```vb
Imports EnvDTE
Imports System.Diagnostics

Public Module Personal

    Sub CollapseAll()

       'DESCRIPTION: Collapse all the nodes in the project tree

        ' Get the the Solution Explorer tree
        Dim oSolutionExplorer As UIHierarchy
        oSolutionExplorer = DTE.Windows.Item(Constants.vsext_wk_SProjectWindow).Object()

        ' Check if there is any open solution
        If (oSolutionExplorer.UIHierarchyItems.Count = 0) Then
            Return
        End If

        ' Get the top node (the name of the solution)
        Dim oRootItem As UIHierarchyItem
        oRootItem = oSolutionExplorer.UIHierarchyItems.Item(1)
        Dim oChildItem As UIHierarchyItem

        ' Collapse each project node
        For Each oChildItem In oRootItem.UIHierarchyItems
            CollapseMe(oChildItem, oSolutionExplorer)
        Next

        ' Select the solution node, or else when you click on the solution window
        ' scrollbar, it will synchronize the open document with the tree and pop
        ' out the corresponding node which is probably not what you want.
        oRootItem.Select(vsUISelectionType.vsUISelectionTypeSelect)

    End Sub


    Sub CollapseMe(ByVal oRootItem As UIHierarchyItem, ByVal oSolutionExplorer As UIHierarchy)

        Dim oChildItem As UIHierarchyItem

        For Each oChildItem In oRootItem.UIHierarchyItems
            CollapseMe(oChildItem, oSolutionExplorer)
        Next

        oRootItem.UIHierarchyItems.Expanded = False

        ' Added to deal with the Visual Studio bug
        If (oRootItem.UIHierarchyItems.Expanded = True) Then
            oRootItem.Select(vsUISelectionType.vsUISelectionTypeSelect)
            oSolutionExplorer.DoDefaultAction()
        End If

    End Sub

End Module
```
