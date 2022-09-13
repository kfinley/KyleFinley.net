# Simple ASP.NET Source Code Line Counter
### Here's a vbscript that will give you a line count for source code in a directory. This script allows you to count all the lines in a given system.

*<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author"><a href="https://twitter.com/kfinley" target="_blank" title="kfinley on Twitter">Kyle Finley</a></span> Published: <time itemprop="pubdate" datetime="10/3/2005 7:36:00 PM">Monday, October 3, 2005</time></div>*

---

A while back I was curious how many lines of code a few projects I've worked on contained. I put together a simple script that would count lines for all source files within a folder hierarchy. I recently suffered the loss of my laptop and along with it a number of files and utilities that I had no back up of. This was one of those utilities. At any rate I decided to recreate the script and thought I would share it. The script is not very accurate and counts lines within any files with extensions matching an array within the script.

The script isn't accurate because it counts all lines within a file, including comments and white space.

Enjoy.

```vbscript
' Kyle Finley, kyle@kylefinley.net
' 2005
' http://kylefinley.net
' Version 1
'
' This script simply counts the number of lines within source code files. The
' current accepted extensions are set to match ASP.NET applications written in
' C#.  Simply change the file type settings in order to count lines for other
' source files.
'
' This script counts every singl line in a file, including
' comments and white spaces.
'


Option Explicit

' Inputs
Dim acceptedExt, sourceDirectory
' Objects
Dim objFSO, objSourceDirectory
' Everything Else.
Dim fileCount, lineCount


''''''' change file type settings here '''''''''''''''''''

acceptedExt = Array ("cs", "vbs", "js", "asax", "aspx", "html", "css", "config", "sql")

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

' Create File System Object
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Get user input for root directory containing source files.
sourceDirectory = Wscript.Arguments(0)

' Validated or quit.
If objFSO.FolderExists(sourceDirectory) Then
     Set objSourceDirectory= objFSO.GetFolder(sourceDirectory)
else
     wscript.echo("Directory could not be found.")
     WScript.Quit
end if


' count files and lines.
lineCount = CountLinesRecursive(objSourceDirectory, fileCount)


' Report result.
wscript.echo ("Total source files: " & fileCount)
wscript.echo ("Total lines of code: " & lineCount)


Function CountLinesRecursive(oDir, countFiles)
   Dim oDat, oSub, o
   CountLinesRecursive= 0
   For each oDat in oDir.files
      If isExt (objFSO.GetExtensionName(oDat.Name)) Then
         Set o = oDat.OpenAsTextStream()
         o.Skip(oDat.Size)
         CountLinesRecursive = CountLinesRecursive + o.Line - 1
         countFiles = countFiles + 1
      End If
   Next
   For each oSub in oDir.subfolders
      CountLinesRecursive = CountLinesRecursive + CountLinesRecursive(oSub, countFiles)
   Next
End Function


Function isExt (extension)
   Dim strExt
   isExt = true
   For each strExt in acceptedExt
      If StrComp(strExt, extension, vbTextCompare) = 0 Then Exit Function
   Next
   isExt = false
End Function
```
