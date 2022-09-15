# Visual Studio Build + Run MSpec
#### How to setup Visual Studio to build your Solution and then run MSpec tests with the MSpec Runner.

*<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author"><a href="https://twitter.com/kfinley" target="_blank" title="kfinley on Twitter">Kyle Finley</a></span> Published: <time itemprop="pubdate" datetime="10/6/2009 2:00:00 AM">Monday, October 5, 2009</time></div>*

---

I hope to put together a full post on [MSpec](http://github.com/machine/machine.specifications) but until then check out Rob Conery's [Make BDD your BFF](http://blog.wekeroad.com/blog/make-bdd-your-bff-2/) post (which I mostly agree with).

If you're too lazy to click on Rob's post and still reading basically MSpec is Aaron Jensen's twist on a BDD based testing framework that rides on top of a more full featured framework such as NUnit or xUnit. Some are calling this approach Context Specification over pure [BDD as Dan North intended it](http://dannorth.net/introducing-bdd) but not going to go into my thoughts on all that here. That's the future post which I promise is coming...

So WTF is this post all about then you may ask. Well if you haven't figured it out already it's a little helper goo you can toss in the VS mix to speed up life and reduce frustrations while using MSpec. Let me back up a little and explain why I did this. MSpec comes with the ability to tie [TestDriven.net](http://testdriven.net/) in as the test runner for all your specs, which is a great thing fore sure! But as all of you know that use TD.net it isn't exactly the snappiest thing in the world. Aaron and crew included another test runner for MSpec which is considerably faster. The problem I kept having (and Rob Conery as well if you look back at his [Kona Sreencast](http://blog.wekeroad.com/mvc-storefront/kona-3/)) was forgetting to build the project after making changes and then running the MSpec runner. What happens? Nothing, your old code runs. The solution didn't build so what would you expect.

So what's the solution? I created a Macro that kicks off a solution build and uses the build events to then kick off the external command associated with the MSPec runner. First off you need to have MSpec setup as an external task for this to work (follow the steps on Rob's post above). Once you do that add in the following macro goodness.

Drop this procedure in any of your personal macro modules (mine is called BDD)

```vb
Public runMSpecOnComplete As Boolean = False

Sub BuildAndRunMSpecForFocusedProject()

    DTE.ExecuteCommand("Build.BuildSolution")
    runMSpecOnComplete = True

End Sub
```

Add the following sub to the EnvirontmentEvents module included under MyMacros. (Note: BDD is the module the above code is located in)

```vb
Private Sub BuildEvents_OnBuildDone(ByVal Scope As EnvDTE.vsBuildScope, ByVal Action As EnvDTE.vsBuildAction) Handles BuildEvents.OnBuildDone

     If (BDD.runMSpecOnComplete) Then
       BDD.runMSpecOnComplete = False
       DTE.ExecuteCommand("Tools.ExternalCommand1") 'Where ExternalCommand1 matches the MSPec runner command
       DTE.Windows.Item(Constants.vsWindowKindOutput).Activate()
     End If

End Sub
```

The last thing I do for more convenience is to associate the Macro with a toolbar button. If you're not sure how to do this just right click on any toolbar in the menus and select customize, on the Commands tab select Macros under Categories list, under the commands listing find the Macro you added the above code to, drag it to a location on the toolbar and drop. Once the command is there you can change the text and the icon. I personally put mine right next to the Play button and use the big Red Diamond. Now when I click on the button my solution builds and my Specs run.

Enjoy!
