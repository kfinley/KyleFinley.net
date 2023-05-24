# Save Space Installing Visual Studio 2005 with SP1

#### Steps for installing Visual Studio 2005 with SP1 (including the TFS Client) with minimal free hard drive space.

_<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author">Kyle Finley</span> Published: <time itemprop="pubdate" datetime="12/11/2007 5:44:00 PM">Tuesday, December 11, 2007</time></div>_

---

As most of you know Service Pack 1 for Visual Studio 2005 is a bit of a beast. I personally think it is the worst update for any Microsoft product I have seen in my 10+ years working with Microsoft products. The problem with the install is that it is a culmination of multiple product SKU updates in a single large file. Also because of the installation process the 430MB install requires upwards of 3GB of free space to install (see [VS 2005 SP1 Requires a lot of Disk Space](http://blogs.msdn.com/heaths/archive/2006/10/06/VS-2005-SP1-Requires-a-lot-of-Disk-Space.aspx) for more details). There are solutions to reducing the size of the installation process such as [Disabling the Patch Cache](http://blogs.msdn.com/heaths/archive/2006/11/28/save-time-and-space-for-vs-2005-sp1-by-disabling-the-patch-cache.aspx) or extracting the .msp from the .exe that is downloaded, but still the process of installing causes much problems in some situations.

I have one of those situations. I do all of my development in a Virtual PC environment. I use a modified setup of differenced disks in order to save space and reduce time to stand up a new development environment. See [Andrew Connell's](http://www.andrewconnell.com/blog/Default.aspx) [HOWTO: Use Virtual PC's Differencing Disks to your Advantage](http://www.andrewconnell.com/blog/articles/UseVirtualPCsDifferencingDisksToYourAdvantage.aspx) blog for details. Because there isn't a way to compact disks which are differenced from another disk it is important to reduce the size of the VHD which has my development tools installed. (If anyone knows a way to compact difference disks please tell me.)

Because the Visual Studio 2005 Service Pack 1 installation requires so much room to simply install my second level VHD file grows far larger than it should. I attempted to install the update using several methods and usually ended up with a VHD that was almost 4GB in size. Keep in mind this VHD should only contain the installation of Visual Studio 2005, not including the MSDN libraries. In my opinion this wasn't acceptable. Luckily [Heath Sterwart](http://blogs.msdn.com/heaths/) posted instructions on how to [slipstream](<http://en.wikipedia.org/wiki/Slipstream_(computing)>) Service Pack 1 into the Visual Studio 2005 Installation, here is the post. Since I spent a few years as an NT admin (props HPS) before focusing on development I was pretty familiar with the process. One note though, Heath's steps are not all that clear, [Richard Rudek](http://richardrudek.spaces.live.com/default.aspx) posted a [clearer break down of the process](http://richardrudek.spaces.live.com/blog/cns!8B65F3DE0BE797AA!185.entry).

After using the slipstreamed installer my differenced VHD, which contains VS 2k5 with SP1, is only 1.7GB in size. So this little trick saved me over 2GB in completely wasted space, I would say that is a pretty significant improvement. I did however run into one problem. Since I work with [Team Foundation Server](http://msdn2.microsoft.com/en-us/teamsystem/aa718825.aspx) I need to install the TFS Client (Team Explorer). Team Explorer is not included in Visual Studio 2005, however Service Pack 1 for Visual Studio applies to Team Explorer (amongst others, see the [Patch Applicability Browser](http://blogs.msdn.com/heaths/pages/pab.aspx) to find out what will be updated on your machine by the SP). This creates a situation where in order to install Team Explorer and have the Service Pack applied to it you must run VS 2k5 Service Pack 1 (yes, the 400+ MB file that requires 3+ gigs of space!). This in my opinion was unacceptable and completely negated the effort of slipstreaming SP1 into the Visual Studio 2005 installation. Luckily there is a solution.

## Slipstream Visual Studio 2005 sp1 Into the Team Explorer Installer

The process is very similar to the process for slipstreaming sp1 into the VS installer. Here are the steps:

1. Make sure you have the official release of Team Explorer.

It can be [downloaded free from MSDN](http://download.microsoft.com/download/2/a/d/2ad44873-8ccb-4a1b-9c0d-23224b3ba34c/VSTFClient.img) or copied from the TFS install CD.

2. Download and unpack the .msp patch for Service Pack 1 from the .exe wrapper if you haven't already.

`C:\>VS80sp1-KB926601-X86-ENU.exe /extract “%TMP%”`

3. Create an Admin install for Team Explorer (Note, this is the vs_setup.msi from the .img file from MSDN or the TFS CD).

`C:\>msiexec /a vs_setup.msi TARGETDIR=\\Server\Share /L*vx "Install.log"`

4. Apply the Service Pack to the network install.

`C:\>msiexec /a "\\Server\Share\vs_setup.msi" /p VS80sp1-KB926601-X86-ENU.msp /L*vx "patch.log"`

5. Install Team Explorer from the network path by running setup.exe.

You may be prompted to insert the original Team Foundation Server CD during the installation. This is the original setup folder without the service pack slipstreamed into it.

6. Done!

This little trick saved me a ton because I kept running into a bug in the TFS Client that was fixed with SP1. Next I'm going to try to slipstream the TFS Client directly into the VS 2k5 installation. This would let me have only one installation point for Visual Studio 20005 to maintain for future service packs. Hope this little trick helps someone out there. And hopefully updates for VS 2008 will be much better than this experience.

-Kyle
