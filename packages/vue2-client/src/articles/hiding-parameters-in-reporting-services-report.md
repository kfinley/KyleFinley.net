# Hiding Specific Parameters in a Reporting Services Report
#### How to hide a parameter on a Reporting Services Report while still being able to pass the report the parameter via the URL or Form Post.

*<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author"><a href="https://twitter.com/kfinley" target="_blank" title="kfinley on Twitter">Kyle Finley</a></span> Published: <time itemprop="pubdate" datetime="2/24/2006 4:03:00 PM">Friday, February 24, 2006</time></div>*

---

Here's an interesting one we found today. We wanted to hide certain user parameters on a report while still being able to pass the report the parameter via the URL or Form POST value. This was not possible in Reporting Services 2000 pre SP1. SP1 addressed the issue but the steps required are not very intuitive and seem to go against what the SP1 Read Me states. Here is the statement from the read me file.

>### 4.3.1 Hiding Parameters in a Published Report
>In Report Manager, you can now set parameter properties in a way that allows you to achieve two objectives simultaneously:

>* Hide the parameter fields in a published report.
>* Specify a parameter value at run time (for example, through a subscription that is used to trigger report execution and delivery).

Previously, the only way to hide a parameter value was to clear the Prompt User check box in the Parameters properties page. However, a side effect of clearing the check box was that you could no longer specify a parameter value for the report at run time. This limitation has been removed. In SP1, you can clear the Prompt User check box to hide the parameter fields and values in the report. Doing so does not introduce restrictions on how you subsequently set the parameter value externally at run time.

If you read this like I did you would think that all you need to do is uncheck the "Prompt User" checkbox for the parameter you want to hide. This is true, it will remove the parameter from the report, but it doesn't allow you to still have the ability to set the parameter via URL or form values. This really isn't what we wanted to do in a current reporting setup. The second statement is what makes it confusing. When I think of "run time" I think of the ability to pass a report a parameter. But that's just not what happens when you follow the directions in the Read Me. If you follow these steps you get an error when you try to pass a report the "hidden" parameter. The error states that the parameter is read-only and can not be modified. This to me is not really the result I would expect based on the terminology used in the parameter properties screen. But after doing some research we were able to find out you could indeed achieve what we wanted to do. But it appears to be totally undocumented and not very logical.
If you want to prevent a report parameter input field from being visible on the report, and still be able to pass the report the parameter via URL or Form POST elements take the following steps:

1. Publish the report to Reporting Services.
2. Open the report properties in Report Manager.
3. Select the Parameters property page.
4. Remove the text in the "Prompt String" textbox for the parameter you wish to hide. Leave the field blank.
5. Apply the settings to the report.

Now you will be able to pass the parameter and the input will not be displayed on the report itself. Keep in mind though that if you do not specify a valid default value for the parameter you will receive an error if you access the report without passing the parameter in the URL or via form elements. I haven't tested any way to do this strictly from the RDL but it's probably doable. Kind of a funky way of doing things but at least it works.

-Kyle
