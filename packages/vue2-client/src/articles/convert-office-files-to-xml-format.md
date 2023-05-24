# Convert Office Files to 2k7 Format - Explorer Context Menu

#### Create a Windows Explorer Context Menu item for converting legacy Office documents to XML Format.

_<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author">Kyle Finley</span> Published: <time itemprop="pubdate" datetime="3/11/2009 12:02:00 AM">Tuesday, March 10, 2009</time></div>_

---

A few months ago I thought of this. I wanted an explorer add-in that would allow me to right click on an Office 2003 or earlier format document and convert it to an Office 2007 format. I know you can simply open the file in its associated Office 2007 application and save as the newer format but this seemed like too much work for me. I typically think of this situation when I go to email a file that is in the older format and think to myself "Gee if it was a 2k7 file it would be smaller."

I started looking around and found that you could do this from code but there are also tools that Microsoft have provided to automate the bulk conversion of legacy Office files to the newer format. Naturally I wanted to leverage the work they had already done if possible.

My early searches led me to [Eric White's](http://blogs.msdn.com/ericwhite/) post [Bulk Convert DOC to DOCX](http://blogs.msdn.com/ericwhite/archive/2008/09/19/bulk-convert-doc-to-docx.aspx). This post pointed me to the [Microsoft Office Migration Planning Manager](http://www.microsoft.com/downloads/details.aspx?FamilyID=13580cd7-a8bc-40ef-8281-dd2c325a5a81&DisplayLang=en). The OMPM consists of a number of things including utilities for bulk file conversion. The one of interest to me was the Office File Converter utility (OFC.exe) This tool seems to be great for bulk converting office files to the new 2007 format but that really isn't what I wanted to do.

Fortunately I stumbled upon something posted on the [OMPM contributions page](http://channel9.msdn.com/wiki/officedeployment/ompmcontributions/) that was promising. It is possible to use the Office Compatibility Pack directly to convert legacy Office files individually to the new Office 2007 Open XML format. In the Office Compatibility Pack there are individual utilities that convert files from the old format to the new format. Apparently the OMPM actually calls these executables directly from the OFC.exe utility.

Here are the individual commands for converting each type of file:

#### Word

```
"C:\Program Files\Microsoft Office\Office12\wordconv.exe" -oice -nme <input file> <output file>
```

#### Excel

```
"C:\Program Files\Microsoft Office\Office12\excelcnv.exe" -oice <input file> <output file>
```

#### PowerPoint

```
"C:\Program Files\Microsoft Office\Office12\ppcnvcom.exe" -oice <input file> <output file>
```

Once I knew there was a way to convert files individually it was just a matter of adding it as an Action for each type of file. The trick was passing the correct parameters to the executables. I put together a little batch file that would allow me to pass in a few parameters and build the correct paths. Save this file in the Windows directory.

ConvertO2k3to2k7.bat

```
"C:\Program Files\Microsoft Office\Office12\%2" -oice %3 %1 "%~$PATH:1x"
```

The batch file takes three parameters. The full path for the original Office 2k3 file, the executable to use for converting the file, and the third is the extra command line argument used for the wordconv.exe utility. (This is a little kludgy but it works.)

Again make sure you save this file in the Windows directory.

Now for each type of file (doc, xls, and ppt) I add a new Action. Here are the steps to create create the action for a Word File Type:

1. In Explorer choose Tools -> Folder Options -> File Types

2. Select the DOC File Type and click Advanced

3. From the Edit File Type dialogue create a New Action

4. For the Action type Convert to docx

5. For the Application used to perform action type ConvertO2k3To2k7.bat "%1" wordconv.exe -nme

The first parameter is the full file path for the file to perform the action on, which is passed as the first parameter to the Action. The second parameter is the executable to use for the conversation, in this case wordconv.exe because we are working with a DOC file type. The third is the extra command argument required by the wordconv.exe utility. You will not need this for the ppt or xls utilities.

Don't worry about selecting Use DDE, it will get selected automatically for you. Not really sure why but it doesn't seem to matter.

6. Click OK to save the action. You will see the new 'Convert to docx' item in the Actions list as such:

<div style="text-align: center;">

![Edit File Type](../../../../media/images/articles/edit-file-type.png)

</div>

7. Click OK on the Edit File Type dialogue and then Close on the Folder Options dialogue.

Once you have performed all the steps you will now see a 'Convert to docx' option in the context menu when you right click on a .doc file. After selecting the option a cmd window will appear while the file is being converted.

<div style="text-align: center;">

![Convert to docx context menu](../../../../media/images/articles/convert-to-docx.png)

</div>

It is possible to select multiple Office files of the same type and convert all of the selected items, however this spawns separate cmd windows for each file. I have found this doesn't work after selecting a large number of files. This option really only works best for single file conversion on the fly which is all I wanted if for.

Hope this is helpful for someone out there. If there are any errors in the steps please feel free to ask questions.

Cheers,<br>
Kyle
