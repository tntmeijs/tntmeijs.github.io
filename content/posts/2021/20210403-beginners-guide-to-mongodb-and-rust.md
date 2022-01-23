+++
author = "Tahar Meijs"
date = "2021-04-03"
title = "Beginner's guide to MongoDB and Rust"
featuredImage = "/images/2021/beginners-guide-to-mongodb-and-rust/cover.png"
+++

# Beginner’s guide to MongoDB and Rust
These days non-relational databases are everywhere. Almost all popular languages have drivers for these databases. Personally,
I’m a fan of MongoDB as it’s fairly easy to work with, performs well, and suits all my needs and *then some*!

In this post, we’ll take a look at the [Rust driver for MongoDB](https://docs.mongodb.com/drivers/rust/). By the end of this
article you’ll be able to operate on your own collections using Rust.

Please bear in mind that this article will stick to relatively basic operations. The goal of this article is to get you up to
speed with the MongoDB driver, that’s all.

We will learn how to:

* Connect to a MongoDB instance using a connection string.
* Insert data into a collection.
* Read data from a collection.
* Update an entry in a collection.
* Delete data from a collection.

## Asynchronous or not?
One of the very first decisions you have to make is whether you’d like to query the database synchronously or asynchronously.
The driver supports both synchronous and asynchronous operations, so it’s up to you to choose the one that suits your needs
best.

The driver supports both [Tokio](https://tokio.rs/) and [async-std](https://async.rs/) runtimes for asynchronous processing,
but Tokio is used by default. Since I don’t really care too much about which asynchronous runtime we’ll use, I’ll stick with
the default: Tokio.

Be sure to check out the [documentation](https://github.com/mongodb/mongo-rust-driver#example-usage) if you’d like to change
the default behavior of the driver. It also describes how to make use of the synchronous methods (should you want to use those
instead).

## Dependencies
Getting started with the MongoDB driver for Rust is easy, just add it as a dependency to your `Cargo.toml` file and you’re good
to go!

I’ve also added Tokio as a dependency, but that’s just because I use the asynchronous version of the MongoDB driver.

![Cargo.toml (created with [Carbon](https://carbon.now.sh/))](/images/2021/beginners-guide-to-mongodb-and-rust/cargo_toml.png)

*Cargo.toml (created with [Carbon](https://carbon.now.sh/))*

## Connecting to MongoDB
We’ll use a connection string to connect to a MongoDB instance.

![Connecting to a MongoDB instance (created with [Carbon](https://carbon.now.sh/))](/images/2021/beginners-guide-to-mongodb-and-rust/connection_mongodb.png)

*Connecting to a MongoDB instance (created with [Carbon](https://carbon.now.sh/))*

Once a connection has been established, we can use the client instance to get access its databases and, in turn, their
collections and documents.

![Accessing databases and their collections (created with [Carbon](https://carbon.now.sh/))](/images/2021/beginners-guide-to-mongodb-and-rust/access_db_and_collection.png)

*Accessing databases and their collections (created with [Carbon](https://carbon.now.sh/))*

## Inserting data into a collection
Let’s start out by investigating how we can create documents.

We’ll need to find a way to serialize data before we can store it in MongoDB. Data in MongoDB is stored in a JSON-like format.
Since JSON isn’t a compact, nor efficient format, MongoDB uses [BSON](https://en.wikipedia.org/wiki/BSON)(binary JSON) instead.

To help us generate BSON, the MongoDB driver comes with a special macro to generate BSON. Alternatively,
[serde.rs](https://crates.io/crates/serde) can be used to easily serialize structures into BSON as well.

We’ll cover both approaches below.

### BSON using “doc!”
In the BSON module, we find the `doc!` macro. This macro can be used to quickly create BSON data.

To make use of this macro, add the following
“[use declaration](https://doc.rust-lang.org/reference/items/use-declarations.html)” to the top of your Rust source file:
`use mongodb::bson::doc`.

We can then use the macro to generate a new BSON document:

![BSON generated using the doc! macro (created with [Carbon](https://carbon.now.sh/))](/images/2021/beginners-guide-to-mongodb-and-rust/bson_doc_macro.png)

*BSON generated using the doc! macro (created with [Carbon](https://carbon.now.sh/))*

### BSON from a structure
Generating BSON from a structure is slightly more complex. It’s not terribly difficult, but we will need to update our
`Cargo.toml` file to include the Serde crate:

![Updated Cargo.toml file (created with [Carbon](https://carbon.now.sh/))](/images/2021/beginners-guide-to-mongodb-and-rust/updated_cargo_toml.png)

*Updated Cargo.toml file (created with [Carbon](https://carbon.now.sh/))*

We need Serde so we can get make use of its Serialize and Deserialize attributes: `use serde::{Serialize, Deserialize};`

Now that we have Serde as a dependency, we can create a new data structure that will represent our document. The big advantage
of representing structures instead of the macro mentioned previously is that you can now easily modify the document’s
structure.

The new structure will have the same fields as the BSON generated by the macro. This allows for easy comparison between the two
approaches.

![Document as a structure (created with [Carbon](https://carbon.now.sh/))](/images/2021/beginners-guide-to-mongodb-and-rust/doc_as_structure.png)

*Document as a structure (created with [Carbon](https://carbon.now.sh/))*

This structure has three annotations:

* **Debug**: allow for easy printing of its contents to the console.
* **Serialize**: attribute provided by Serde to serialize data
* **Deserialize**: attribute provided by Serde to deserialize data

Creating an instance of this structure is straightforward and will not be covered. It works exactly the same as any other
structure in Rust.

### Inserting data
We took a bit of a detour there with all the BSON talk… But we’re finally ready to start inserting data into our collections!

Inserting BSON data generated with the macro is easy enough:

![Inserting a structure into a collection using the doc! macro (created with [Carbon](https://carbon.now.sh/))](/images/2021/beginners-guide-to-mongodb-and-rust/insert_structure.png)

*Inserting a structure into a collection using the doc! macro (created with [Carbon](https://carbon.now.sh/))*

If you’re using structures, however, you’ll run into an error that tells you that a structure of type `mongodb::bson::Document`
is expected.

To fix this, import the `mongodb::bson::to_document` function. This method allows us to serialize our structure into BSON as
shown in the snippet below:

![Inserting a structure into a collection (created with [Carbon](https://carbon.now.sh/))](/images/2021/beginners-guide-to-mongodb-and-rust/insert_structure_to_document.png)

*Inserting a structure into a collection (created with [Carbon](https://carbon.now.sh/))*

## Reading data from a collection
One of the common operations you’ll most likely perform on your collections is reading data from them. The BSON currently in
our database is fairly boring, so we’ll clear out the existing collection to prepare for the next chapter…

Also, let’s create a new structure called `Person` and give it some properties:

![Person struct (created with [Carbon](https://carbon.now.sh/))](/images/2021/beginners-guide-to-mongodb-and-rust/person_struct.png)

*Person struct (created with [Carbon](https://carbon.now.sh/))*

We’ll go ahead and insert a couple of these objects into the collection. Check out the previous chapter to learn how you can
insert the data.

Bonus points: read the documentation and use `insert_many` to insert a bunch of documents at once!

If all went well, you should end up with a database that looks somewhat like so:

![Database with various documents](/images/2021/beginners-guide-to-mongodb-and-rust/db_various_docs.png)

*Database with various documents*

Reading data from a collection is relatively easy. You have multiple functions at your disposal to do so. I’d highly recommend
looking at the documentation to see what the other functions do, but we’re just going to have a look at the `find_one()`
function.

This function does exactly what you’d expect it to do: it’ll find a single entry in the database that matches your filter.

![Reading a single document from a collection (created with [Carbon](https://carbon.now.sh/))](/images/2021/beginners-guide-to-mongodb-and-rust/read_single_document.png)

*Reading a single document from a collection (created with [Carbon](https://carbon.now.sh/))*

As you may have noticed, we use a BSON document as a filter. You could, of course, use a structure here instead. Just serialize
it into a BSON document and you’re good to go.

Personally, I find the macro easier to read and use, but that’s just personal preference.

## Updating data in a collection
Updating data in collections is relatively simple. The difficult part is constructing a good query. Once you have a query,
you’ll just have to make a call to `update_one` or `replace_one` in order to submit your updated data.

![Updating a field of an existing document in a collection (created with [Carbon](https://carbon.now.sh/))](/images/2021/beginners-guide-to-mongodb-and-rust/update_existing_doc.png)

*Updating a field of an existing document in a collection (created with [Carbon](https://carbon.now.sh/))*

You’ll have to make the decision whether it’s better to update a couple of fields, or replace the entire document with a new
one. Both functions take in almost identical arguments, so it should be easy to convert the code above into a replace operation
instead.

## Deleting data from a collection
Removing your data is as easy reading it. In fact, the code is pretty much identical, except for the function’s name!

![Delete an existing document from a collection (created with [Carbon](https://carbon.now.sh/))](/images/2021/beginners-guide-to-mongodb-and-rust/delete_existing_doc.png)

*Delete an existing document from a collection (created with [Carbon](https://carbon.now.sh/))*

## Closing words
I hope this short introduction to the MongoDB Rust driver has helped you to get up to speed with MongoDB and Rust. Obviously
there’s a ton of stuff we haven’t covered yet in this article, but you should now have enough knowledge to figure it out by
yourself.

For instance, we’ve only covered the simplest database functions. The driver comes with a bunch of other functions such as
`find`, `find_one_and_update`, `find_one_and_delete`, `insert_many`, `count_documents`, and many others!

I’d highly recommend you to check out the crate’s [documentation](https://docs.rs/mongodb/1.2.0/mongodb/index.html) to learn
more about the Rust driver.

Thank you so much for taking the time to read this article.

Have a good one.

Cheers!
