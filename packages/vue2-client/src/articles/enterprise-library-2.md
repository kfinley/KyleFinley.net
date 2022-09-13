# Enterprise Library for .NET Framework 2.0 Release
### Microsoft's Patterns & Practices group has released a new version of the Enterprise Library designed for the .NET Framework 2.0.

*<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author"><a href="https://twitter.com/kfinley" target="_blank" title="kfinley on Twitter">Kyle Finley</a></span> Published: <time itemprop="pubdate" datetime="1/23/2006 8:06:00 PM">Monday, January 23, 2006</time></div>*

---

Microsoft's Patterns & Practices group has released a new version of the Enterprise Library designed for the .NET Framework 2.0. For complete details and download visit the [P&P site](http://msdn.microsoft.com/library/?url=/library/en-us/dnpag2/html/EntLib2.asp). This release of the Enterprise Library is more than just an update to work with the new .NET 2.0 Framework. The entire library has been rewritten from the ground up to take advantage of the new features in the .NET 2.0 Framework as well as address various issues such as performance. This release works only with .NET 2.0 so for projects that are .NET 1.1 based the EntLib June 2005 release should still be used.

For those of you not familiar with the Enterprise Library it is a library of application blocks designed to assist developers with common enterprise development challenges. Application blocks are a type of guidance, provided as source code that can be used "as is," extended, or modified by developers to use on development projects. The application blocks included in the library are intended to help address common problems that developers face on typical software projects. They are designed to encapsulate the Microsoft recommended best practices for .NET-based applications.

The application blocks included in the Enterprise Library 2.0 release are:

- **Caching Application Block** With this application block, developers can incorporate a local cache in their applications.
- **Cryptography Application Block** With this application block, developers can incorporate hashing and symmetric encryption in their applications.
- **Data Access Application Block** With this application block, developers can incorporate standard database functionality in their applications.
- **Exception Handling Application Block** With this application block, developers and policy makers can create a consistent strategy for processing exceptions that occur throughout the architectural layers of enterprise applications.
- **Logging Application Block** With this application block, developers can include standard logging functionality in their applications.
- **Security Application Block** With this application block, developers can incorporate authorization and security caching functionality in their applications.

The key changes in the EntLib 2.0 release include:

- Configuration is now build on System.Configuration
- Configuration Application Block no longer exists
- Easier to use blocks with or without configuration files
- Instrumentation configurable and disabled by default
- Deployment is much easier
- Improved Logging Application Block
- Improved Flexibility and Performance
- Simpler and more powerful Data Access Application Block
- Most of the Security Application Block has been removed
- Deprecated in favor of .NET Membership and Profile features

Using the Enterprise Library 2.0 release is very similar to how things were done in the 1.x release. One of the major differences is in how configuration is handled. The download includes a samples usage of each block as well as guidance in migrating from EntLib 1.x features to EntLib 2.0 and the .NET Framework 2.0.
For more information on changes in the library view [release info here](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnpag2/html/entlibjan2006_aboutjan2006release.asp). There are also a few MSDN Webcasts covering the Enterprise Library search for those via the Webcast site. For up-to-date information and guidance with using the Enterprise Library watch the following EntLib Team Member Blogs:

- [Tom Hollander](http://blogs.msdn.com/tomholl)
- [Edward Jezierski](http://blogs.msdn.com/edjez)
- [Scott Densmore](http://blogs.msdn.com/scottdensmore)
- [Brian Button](http://www.agileprogrammer.com/oneagilecoder/)
- [Fernando Simonazzi](http://clariusconsulting.net/blogs/fds/)
- [Olaf Conijn](http://bloggingabout.net/blogs/olaf/)
- [Brad Wilson](http://www.agileprogrammer.com/dotnetguy/)
- [Peter Provost](http://www.peterprovost.org/)

If you are not familiar with the EntLib I highly recommend you give it a look. There is some pretty cool stuff inside if you are into picking apart code. Also this is a great source of sample code which follows development best practices, such as unit test classes for testing .NET code (NUnit & VS2006 compatible).

**Now Playing**: *Jimmy Eat World* - Clarity - For Me This Is Heaven
