# Managing Completed Tasks in Outlook
### Keep your tasks in Outlook organized. Here is a simple Macro for moving completed Outlook Tasks to a separate folder.

*<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author"><a href="https://twitter.com/kfinley" target="_blank" title="kfinley on Twitter">Kyle Finley</a></span> Published: <time itemprop="pubdate" datetime="9/30/2005 12:00:00 AM">Thursday, September 29, 2005</time></div>*

---

I know this is not .NET related but it's a helpful little macro I put together last week.

I use Outlook to manage a lot of my tasks with work and my personal life.  I'm sure a lot of you out there do as well.  I've never been that impressed with how tasks work in Outlook, but I've also not found an better PIM tool to handle my daily tasks.  I've tried using a few Outlook Add-Ons to perform some more features but haven't really been happy with those or been willing to pay the money for them.

Last week I decided to fix my biggest complaints, which how to deal with Task Items that have been marked as complete.  I usually just delete the items but then I'm left with no real way of tracking Items I've completed.  I would rather move the items to a specific folder, but I don't want to do it by hand.  To fix the problem I created a macro that would move completed task items to a folder under a predefined 'Completed' folder with the same name as the category which is specified in the task item.  If no 'Completed' folder exists for the category, than one is created.  The macro doesn't do any recursion and must be run on each individual folder that has Task Items.  More details are mentioned in the comments.

One thing I'm not happy with is that the macro must be run by hand.  I would prefer to hook into some type of event, such as a task item chaged event, but I haven't been able to do that.  If anyone knows how let me know and I'll update the macro.

```vbscript
Sub Move_Completed_Tasks()

    ' Kyle Finley, rkfinley@hotmail.com
    ' Copyright Kyle Finley 2005
    ' http://blogthis.org,  http://kylefinley.net/
    ' Revision 1
    '
    ' This is a macro for Microsoft Outlook 2003 that performs one simple task,
    ' moving items that have been completed to a a folder that matches the task
    ' category.
    '
    ' The folder the task is moved to will be created if it doesn't exist and will
    ' be located under a folder called "Completed" under the default outlook task
    ' folder.  For example if you have a taks with a category of Business, and the
    ' task has been completed, the task will be moved to "Tasks/Completed/Business."
    ' If either the Completed folder or the Business folder does not exist they will
    ' be created.
    '
    ' If tasks contain no Category than a message box will be displayed warning that
    ' the task does not have a category and the item will not be moved.
    '
    ' If the macro is run when Outlook is not currently displaying a folder containing
    ' task items than the default task folder is used, otherwise the current folder
    ' being displayed will be processed.  No recursion takes place so the macro needs
    ' to be run on each folder containing task items.
    '
    ' Note on Outlook macro permissions: Outlook has an unusual behavior where
    ' it will let you write and run macros, but if you quit and restart, it applies
    ' a different set of permissions rules to the macros that you wrote previously.
    ' The result is a message box claiming that macros are disabled in outlook.
    ' To get around this, go to Tools -> Macro -> Security and either lower the
    ' setting to medium, or go through the process of signing your macros (the help
    ' on this isn't too bad). Also it seemed to me that you have to restart outlook
    ' for the security settings to actually be lowered.
    '

    Dim myolApp As Outlook.Application
    Dim myNamespace As Outlook.NameSpace
    Dim myFolderTasks As Outlook.MAPIFolder
    Dim targetFolder As Outlook.MAPIFolder
    Dim targetFolderName As String
    Dim completedFolder As Outlook.MAPIFolder

    Set myolApp = CreateObject("Outlook.Application")
    Set myNamespace = myolApp.GetNamespace("MAPI")

    ' Grab the default tasks folder so we can get the completed folder
    ' Use this folder if we are not currently looking at a folder with task items.
    Set myFolderTasks = myNamespace.GetDefaultFolder(olFolderTasks)

    On Error Resume Next
    Set completedFolder = myFolderTasks.Folders("Completed")

    ' Create a completed folder if one doesn't exist
    If completedFolder Is Nothing Then
        Set completedFolder = myFolderTasks.Folders.Add("Completed", olFolderTasks)
    End If

    ' check to see if we are currently looking at a task folder, if so use that folder instead of the default tasks folder
    If myolApp.ActiveExplorer.CurrentFolder.DefaultItemType = olTaskItem Then
        Set myFolderTasks = myolApp.ActiveExplorer.CurrentFolder
    End If

    Dim myItem As Outlook.TaskItem

    i = 1

    ' Loop through each item and check it's status, move it if it is complete
    While i <= myFolderTasks.Items.Count

        Set myItem = myFolderTasks.Items(i)

        Set targetFolder = Nothing
        targetFolderName = ""

        If (myItem.Status = olTaskComplete) Then

            ' Get the target folder, same as category
            targetFolderName = myItem.Categories

            ' Don't move items with no Category, complain so it will be fixed.
            If targetFolderName = "" Then
                MsgBox ("Task '" & myItem.Subject & "' has no category")
            Else
                Set targetFolder = completedFolder.Folders(targetFolderName)

                ' If there is no target folder than create one.
                If targetFolder Is Nothing Then
                    Set targetFolder = completedFolder.Folders.Add(targetFolderName, olFolderTasks)
                End If

                ' Finally move the item to the target folder
                myItem.Move targetFolder
                ' set the counter back one because the item count has changed
                i = i - 1
            End If
        End If

        ' increment counter
        i = i + 1
    Wend
End Sub
```
