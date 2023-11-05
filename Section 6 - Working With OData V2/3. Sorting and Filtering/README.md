# Working With OData | Sorting & Filtering

If we try to sort or filter our list, we see that everything works except for filtering or gouping by category.

That's great news because that means no matter which model we use, JSON or OData, UI5 takes care of everything for us under the hood.

We will deal with tehcategory in the next video, but now let's inspect how sorting and filtering is done with OData.

## Sorting

Sorting is done by sending the `$orderby` url parameter.

If we sort by price, ascending (which is the default), we can see the url structured as below.

<p style="font-family:Courier New, Courier, monospace;">/OData/OData.svc/Products?$skip=0&$top=5&<span style="color:yellow">$orderby=Price</span>&$inlinecount=allpages</p>

If we sort descending, we can see that `desc` is appended to the value of the `$orderby` parameter.

<p style="font-family:Courier New, Courier, monospace;">/OData/OData.svc/Products?$skip=0&$top=5&<span style="color:yellow">$orderby=Price desc</span>&$inlinecount=allpages</p>

Since the spaces and special characters are URL encoded, we see %20 for every space character in the URL.

## Filtering

Similarly, filtering is done using the `$filter` parameter.

Let's filter our products by price less than €10 and see what the request URL looks like.

<p style="font-family:Courier New, Courier, monospace;">/OData/OData.svc/Products?$skip=0&$top=5&<span style="color:yellow">$filter=Price lt 10</span>&$inlinecount=allpages</p>

We see that the structure is different for filter.

`$fitler=<PropertyName> <operator> <value>`

Now let's select one more filter.

<p style="font-family:Courier New, Courier, monospace;">/OData/OData.svc/Products?$skip=0&$top=5&<span style="color:yellow">$filter=Price lt 10 or (Price ge 10 and Price le 50)</span>&$inlinecount=allpages</p>

We see that UI5 constructs the request url for us.

It is possible to construct more complex filters, but we will leave that for later.

Detailed information can be found at [odata.org](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/).
