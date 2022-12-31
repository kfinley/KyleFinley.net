# TypeMerger - Merge Objects into an Anonymous Type in C#

#### TypeMerger allows you to combine two objects into a new object using C#. Includes the option to ignore properties so they are not included in the final object.

_<div class="article-meta-data"> by
<span class="article-meta-author" itemprop="author"><a href="https://twitter.com/kfinley" target="_blank" title="kfinley on Twitter">Kyle
Finley</a></span> Published:
<time itemprop="pubdate" datetime="10/15/2009 5:00:00 AM">Thursday, October 15,
2009</time></div>_

---

The other day I ran into this situation and found not only a good solution but also built it up a bit. I thought I would share it. My situation was this, I'm working in an ASP.NET MVC site built in C# and I needed to combine an object with some additional information, as JSON, and pass it back to the original caller, which happens to be an AJAX call. For this post I'm going to focus on the first part of the situation, combining a concrete object with additional info, I'll address serializing to JSON in a future post.

Lately I've been utilizing
[Anonymous Types](http://msdn.microsoft.com/en-us/library/bb397696.aspx) a lot more. In this situation my 'additional information' mentioned above happens to be represented by an Anonymous Type, therefore my first thought was to create something that would take a couple of objects (concrete or anonymous) and merge them into a new anonymous type that I create on the fly, then I could serialize that Anonymous Type to JSON to return. Some of you may be thinking "Wait, you can pass around Anonymous Types, they have method scope!" Actually, yes you can pass them around all you want, the thing is you only get an Object to work with and can only access it's members using Reflection or you can cast that Object back into an Anonymous Type which shares the same signature. Check out this post for more info on this.

So before doing any coding myself I did a quick search to see if anyone else had solved this problem. I stumbled across [Mark Miller's](http://www.developmentalmadness.com/Default.aspx) post [Extending Anonymous Types using Reflection.Emit](http://www.developmentalmadness.com/archive/2008/02/12/extend-anonymous-types-using.aspx). Perfect, exactly the direction I was thinking! I tested it out and it worked exactly as expected and is written basically how I was thinking so all is good right? Well, not completely. One thing I wanted from the solution was the ability to ignore some properties from the source objects. Basically think [AutoMapper](http://www.codeplex.com/AutoMapper) CreateMap / ForMember / option.Ignore functionality while merging two objects into a completely new object created on the fly. If you're wondering why not just use AutoMapper for this, well unfortunately it doesn't work with Anonymous Types, or at least I haven't figured out how to make it (and even if it can the syntax would be pretty clumsy).

In coming up with this solution I looked at the way AutoMapper does it's thing but decided I really didn't want to deal with lambdas in my syntax. I wanted something that was very fluid and simple. So as any TDD'er I started out with a unit test and just started typing the syntax I wanted. Here is what I came up with:

```csharp
var result = TypeMerger.Ignore(obj1.SomeProperty).Ignore(obj2.AnotherProperty).MergeTypes(obj1, obj2) ;
```

I thought this was pretty simple and easily showed what the code was doing. The idea here is to use [Method Chaining](http://martinfowler.com/dslwip/MethodChaining.html) in order to have a smooth syntax. (yes, I've been using JQuery a lot lately and if you're familiar with StructureMap you may recognize the pattern too.) If you're not familiar with the Method Chaining pattern it is more common than you think. Here is Martin Fowler's explanation of the pattern:

> "Make modifier methods return the host object so that multiple modifiers can be invoked in a single expression."

Method Chaining is used throughout the JQuery framework as well as in the .NET Framework (i.e. `DateTime.Now.AddDays(1);`). It's a pretty easy pattern to build into your classes and provide fluid interaction with your classes.

For my situation I am dealing with a static class (TypeMerger), which makes the Method Chaining setup a little bit more complex but not much. In the most basic form Method Chaining will return the object for which the call was made on. This doesn't work for Static classes so we have to use an [Expression Builder](http://martinfowler.com/dslwip/ExpressionBuilder.html). So what is an Expression Builder? I basically think of it as a buddy class for the target object that will be used to complete the Method Chaining process. For this situation that means keeping track of the items we want to ignore when we merge two types.

Here is the companion class that handles the details of tracking the properties we want to ignore. Introducing the TypeMergerPolicy class:
<git-hub-source-code lang="csharp" path="https://api.github.com/repos/kfinley/TypeMerger/contents/src/TypeMerger/TypeMergerPolicy.cs"></git-hub-source-code>

Looks pretty simple but what's going on here? The TypeMergerPolicy class has an internal List of objects which store the reference to the items to exclude while merging. The MergeTypes method at the end is what allows us to stop the chain. This method simply calls MergeTypes on the Static class TypeMerger passing itself as an argument.

In order to make this all work of course I had to modify the original TypeMerger class to
use the new TypeMergerPolicy class. Here are the changes I had to make:

-   Add a private static TypeMergerPolicy object to store the items to ignore.
-   Overload the constructor to take a TypeMergerPolicy class (used by the
    TypeMergerPolicy.MergeTypes method).
-   Modify a few of the methods to use the TypeMergerPolicy class to exclude properties.
-   And finally the Ignore method that kicks off the Method Chaining.

Here are the modifications I made to the TypeMerger Class:
<git-hub-source-code lang="csharp" path="https://api.github.com/repos/kfinley/TypeMerger/contents/src/TypeMerger/TypeMerger.cs" />

That's it! As you can see the TypeMerger.Ignore method kicks off the process and the TypeMergerPolicy.MergeTypes method finishes it off. Below is the full source with a simple unit test included. Please feel free to let me know what you think of the approach.

[TypeMerger Project on GitHub](https://github.com/kfinley/typemerger)

Cheers,<br/> Kyle
