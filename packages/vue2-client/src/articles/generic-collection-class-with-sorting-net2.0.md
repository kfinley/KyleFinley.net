# Generic Collection Class with Sorting Support in C# .NET

#### Create a Generic Collection with Sorting Support using C# in .net 2.0.

_<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author">Kyle Finley</span> Published: <time itemprop="pubdate" datetime="2/8/2006 6:00:00 AM">Wednesday, February 8, 2006</time></div>_

---

One of the coolest new features in .NET 2.0 is the introduction of Generics. For those of you that have been creating tons of strongly typed collections for your business objects I'm sure you had the same reaction I did when you heard about them. "Sweet!! Now I can stop generating and tweaking derived collection classes all over the place!!" (This is assuming you've all been using some sort of refactoring tool that can generate the collection classes for you, I hope you have.) OK, so now we know we can create strongly typed collections in our code. You might be wondering why I'm suggesting we still create a separate collection class and not just use the generic collections included in the System.Collections.Generic namespace. The idea is that we can create our own collections that support generics that provide us with specific needs that we might commonly use or need for a specific application. In this article I will present a simple collection class which both supports Generics as well as Sorting.

For those of you who already know a bit about Generics you might be saying to yourself "Aren't there already generic collections that support sorting?" Yes, there are. But the point of this article is to show how we can create our own generic collections that can encapsulate specific functionality, such as sorting, within our applications. This article is meant to introduce a generic collection that will be used future articles. The follow up articles should easily show the advantage of creating our own generic collections. OK, so now that we all know what is about to be built let's see how it is done.

Creating the Generic Collection Class
This article is not meant to be a detailed explanation of Generics so I'm going to jump right into the code. We are going to create a class which inherits from the System.Collections.BaseCollection class and provides us all the collection methods and properties we need, including the ability to sort the collection based on any property name of an object within the class. More details on that later, let's look at the shell of the collection class.

```csharp
using System;

public class SortableCollection<T> : System.Collections.CollectionBase
{
    public virtual T this[int index]
    {
        get { return (T)this.List[index] ; }
        set { this.List[index] = value ; }
    }

    public virtual int IndexOf(T item)
    {
        return this.List.IndexOf(item) ;
    }

    public virtual int Add(T item)
    {
        return this.List.Add(item) ;
    }

    public virtual void Remove(T item)
    {
        this.List.Remove(item) ;
    }

    public virtual void CopyTo(Array array, int index)
    {
        this.List.CopyTo(array, index) ;
    }

    public virtual void AddRange(SortableCollection<T> collection)
    {
        this.InnerList.AddRange(collection) ;
    }

    public virtual void AddRange(T[] collection)
    {
        this.InnerList.AddRange(collection) ;
    }

    public virtual bool Contains(T item)
    {
        return this.List.Contains(item) ;
    }

    public virtual void Insert(int index, T item)
    {
        this.List.Insert(index, item) ;
    }
}
```

The SortableCollection class inherits from the BaseCollection abstract class. This provides us the basis for creating a custom collection. This is no different than how things were done in .NET 1.x when creating typed collections. Next all the basic methods and properties that are needed for basic operations for a the collection can be added to the SortableCollection class. The final step is to add the specific details that make the collection sortable based on an objects property name. Before this can be done a custom comparer class needs to be created that will be used for handling the details of sorting the collection member objects.

## Custom Comparer Class

---

The Comparer class will provide the ability to specify which property will be used for sorting, as well as compare two objects based on that property value. Since the collection will be sorted based on object property values, reflection will used to provide access to the value of the property name specified by the caller. Below is the implementation of the comparer class.

```csharp
using System;
using System.Collections;

public class Comparer : IComparer
{
    string m_SortPropertyName ;
    SortDirection m_SortDirection ;

    public Comparer(string sortPropertyName)
    {
        this.m_SortPropertyName = sortPropertyName ;
        this.m_SortDirection = SortDirection.ASC ;
        // default to ascending order
    }

    public Comparer(string sortPropertyName, SortDirection sortDirection)
    {
        this.m_SortPropertyName = sortPropertyName ;
        this.m_SortDirection = sortDirection ;
    }

    public int Compare(object x, object y)
    {
        // Get the values of the relevant property on the x and y objects

        object valueOfX = x.GetType().GetProperty(m_SortPropertyName).GetValue(x, null) ;
        object valueOfY = y.GetType().GetProperty(m_SortPropertyName).GetValue(y, null) ;

        IComparable comp = valueOfY as IComparable ;

        // Flip the value from whatever it was to the opposite.
        return Flip(comp.CompareTo(valueOfX)) ;
    }

    private int Flip(int i)
    {
        return (i * (int)m_SortDirection) ;
    }
}
```

When the sort method is called a required parameter is the direction in which to sort. This will be represented as an enum to prevent any typos resulting in runtime errors. The values of the enum items are important because of the simple math performed in the Flip method of the Comparer class.

```csharp
public enum SortDirection
{
    ASC = -1,
    DESC = 1
}
```

## Adding the Sort Functionality

---

Now that the Comparer class is complete the details around sorting can be added to the SortableCollection class. There are two sort methods that will be provided. One will accept a property name on which to sort the collection as well as the direction in which to sort. The other will simply take the property name and default to an ascending sort.

```csharp
using System ;

public class  SortableCollection<T> : System.Collections.CollectionBase
{

     public void  Sort( string  sortExpression, SortDirection sortDirection)
    {
        InnerList.Sort( new  Comparer(sortExpression, sortDirection)) ;
    }

     public void  Sort( string  sortExpression)
    {
        InnerList.Sort( new  Comparer(  sortExpression ) ) ;
    }

     /*
     *
     * Additional code removed for simplicity.
     * Look above or in source files.
     *
     */
}
```

## Sample Usage of the SortableCollection

---

At this point all the code needed for the SortableCollection class is complete. In order to see the collection in use the following sections will create a simple Employee class which will then be used to populate a SortableCollection or that type. Finally a sample of the call made to the sort method is provided.

```csharp
using System ;

public class Employee
{
    private string m_FirstName, m_LastName ;
    private int m_ID ;
    private DateTime m_HireDate ;
    private string m_Title ;
    private string m_Gender ;

    public int ID
    {
        get { return m_ID ; }
        set { m_ID = value ; }
    }
    public string FirstName
    {
        get { return m_FirstName ; }
        set { m_FirstName = value ; }
    }
    public string LastName
    {
        get { return m_LastName ; }
        set { m_LastName = value ; }
    }
    public string Title
    {
        get { return m_Title ; }
        set { m_Title = value ; }
    }
    public string Gender
    {
        get { return m_Gender ; }
        set { m_Gender = value ; }
    }
    public DateTime HireDate
    {
        get { return m_HireDate ; }
        set { m_HireDate = value ; }
    }
}
```

For simplicity sake just imagine for a moment that a method exists in some class that populates a SortableCollection with Employee objects and then return the collection. Here is an example of such a method minus the details of retrieving the employee information.

```csharp
public static SortableCollection<Employee> GetEmployees()
{
     SortableCollection<Employee> employeeList = new SortableCollection<Employee>() ;
    /*
     *
     * Code to retrieve Employees from Database and populate a
     * SortableCollection of Employee objects
     *
     */

     return employeeList ;
}
```

This method can be called to return a SortableCollection object containing only Employee objects. Once this collection is returned the sort method can be called passing in the name of a property on the Employee object.

```csharp
.
.
.
// Get the list of employees.
SortableCollection<Employee> allEmployees = GetEmployees();

// Sort the list by using the Title Property
allEmployees.Sort("Title", SortDirection.DESC) ;
.
.
.
```

## Conclusion

---

As we can see the process of creating the class is not much different than what we did before with strongly typed collections in .NET 1.x. The difference now is we only have to write the collection once and reuse it all over the place! Also in this example we saw how to create a generic collection that is sortable based on property values. This collection will be used in future posts on the new ASP.NET GridView control. (I'm sure you're starting to see where the sorting feature might come in handy). As always feedback or suggestions are always welcome.

-Kyle

**Now Playing:\*** _Ned's Atomic Dustbin_ - God Fodder - Grey Cell Green

### Comments (closed)

---

## _re: Creating a Generic Collection Class with Sorting Support in .NET 2.0_

_Thursday, May 18, 2006 2:32 AM by BennyXNO_

Nice collection.

I needed one extra function in my solution, and added the following:

```csharp
public class SortableCollection<T> : System.Collections.CollectionBase where T :new() // The new constraint //

public T Find(string sortExpression, object value)
{
T item = new T();

item.GetType().GetProperty(sortExpression).SetValue(item, value, null);

return (T) InnerList[InnerList.BinarySearch(item, new Comparer(sortBLOCKED EXPRESSION];
}
```

Is there a better way to Find/Lookup one object based on a property?

---

## _re: Creating a Generic Collection Class with Sorting Support in .NET 2.0_

_Wednesday, June 28, 2006 12:12 PM by Fernando Correia_

Great article! Very useful.

I hope you can post the follow-up articles that you mentioned on this one...

---

## _re: Creating a Generic Collection Class with Sorting Support in .NET 2.0_

_Thursday, March 08, 2007 9:13 AM by Jason Hanford-Smith_

Isn't there a way to have the sort be type-safe? There seems to be a whole lot of boxing/unboxing going on, which, in the generic collection, somewhat defeats the point.

---

## re: Creating a Generic Collection Class with Sorting Support in .NET 2.0

_Thursday, March 08, 2007 3:37 PM by foobar_

Yes, it can be typesafe, but it's actually pretty tricky. You need to create a type safe method dynamically. Here's all the hard work. I can't take any credit for this; I found it on a website somewhere that I have long forgotten about:

```csharp
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Reflection.Emit;

[Serializable]
internal class MemberComparer<T> : IComparer<T>
{
private delegate int CompareDelegate(T x, T y);
private CompareDelegate _compare;

public MemberComparer(string memberName)
{
_compare = GetCompareDelegate(memberName);
}

public int Compare(T x, T y)
{
return _compare(x, y);
}

private CompareDelegate GetCompareDelegate(string memberName)
{
Type objectType = typeof(T);

PropertyInfo pi = objectType.GetProperty(memberName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance | BindingFlags.Static);
FieldInfo fi = objectType.GetField(memberName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance | BindingFlags.Static);
Type memberType = null;
bool isProperty = false;

if (pi != null)
{
if (pi.GetGetMethod() != null)
{
memberType = pi.PropertyType;
isProperty = true;
}
else
{
throw new Exception(String.Format("Property: '{0}' of Type: '{1}' does not have a Public Get accessor", memberName, objectType.Name));
}
}
else if (fi != null)
{
memberType = fi.FieldType;
}
else
{
throw new Exception(String.Format("'{0}' is not a Public Field or Property with a Get accessor for Type: '{1}' ", memberName, objectType.Name));
}

Type comparerType = typeof(Comparer<>).MakeGenericType(new Type[] { memberType });
MethodInfo getDefaultMethod = comparerType.GetProperty("Default").GetGetMethod();
MethodInfo compareMethod = getDefaultMethod.ReturnType.GetMethod("Compare");

DynamicMethod dm = new DynamicMethod("Compare_" + memberName, typeof(int), new Type[] { objectType, objectType }, comparerType);
ILGenerator il = dm.GetILGenerator();

// Load Comparer<memberType>.Default onto the stack
il.EmitCall(OpCodes.Call, getDefaultMethod, null);

// Load the member from arg 0 onto the stack
il.Emit(OpCodes.Ldarg_0);

if (isProperty)
{
il.EmitCall(OpCodes.Callvirt, pi.GetGetMethod(), null);
}
else
{
il.Emit(OpCodes.Ldfld);
}

// Load the member from arg 1 onto the stack
il.Emit(OpCodes.Ldarg_1);

if (isProperty)
{
il.EmitCall(OpCodes.Callvirt, pi.GetGetMethod(), null);
}
else
{
il.Emit(OpCodes.Ldfld);
}

// Call the Compare method
il.EmitCall(OpCodes.Callvirt, compareMethod, null);

il.Emit(OpCodes.Ret);

return (CompareDelegate)dm.CreateDelegate(typeof(CompareDelegate));
}
}
```

---

## re: Creating a Generic Collection Class with Sorting Support in .NET 2.0

_Thursday, March 08, 2007 3:40 PM by foobar_

I should add that the above is quite performant; IIRC it's actually much quicker than the method in the post.

---

## re: Creating a Generic Collection Class with Sorting Support in .NET 2.0

_Monday, March 12, 2007 4:38 PM by Kyle Finley_

foobar, Good stuff. I don't even do this the same way anymore. I just never got back to update it. I like what you added though. If I ever update this I might incorporate your method.

Cheers,
Kyle

---

## re: Creating a Generic Collection Class with Sorting Support in .NET 2.0

_Wednesday, August 29, 2007 3:43 AM by balu_

It is a good stuff to learn the Generic collection class.

---
