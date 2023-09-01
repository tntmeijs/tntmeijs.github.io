---
title: "Actix.rs - a newbie's perspective"
date: "2021-03-26"
featuredImage: "cover.png"
categories:
    - tutorial
tags:
    - rust
---

# Actix.rs - a newbie's perspective
These days the Rust programming language seems to be everywhere you go online. In fact, the Rust language was rated as one of
the most loved languages by the community in the
[2020 StackOverflow developer survey](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages-loved)!

I often tend to stay away from hypes and new languages, but the amount of engineers praising Rust has grown significantly over
the years. So much that I just had to check it out myself!

My day-to-day job mostly involves writing backends using either [.NET](https://dotnet.microsoft.com) or
[Spring Boot](https://spring.io/projects/spring-boot). I decided to stick to that domain and attempt to write a simple
webserver in Rust myself.

I will be using [Actix.rs](https://actix.rs) to write a webserver because it looked like one of the more mature frameworks in
the Rust web ecosystem. The documentation is solid and the Rust community is quite positive about its capabilities.

Do note that I’m not an experienced Rust programmer at all. However, I think that this lack of knowledge allows me to give you
a fresh perspective on how difficult it’d be for a beginner to switch from Java or C# to Rust.

## Hello, Actix.rs!
After about ten minutes or so I managed to get my very first Rust web server up and running. I could navigate to
[localhost:8080](http://localhost:8080/) and see my welcome message. It’s not much, but it’s a start!

At this point, I realized that it’d take me a long time to learn all the quirks and features of the Actix.rs framework. It’s
not as extensive as the Spring Boot framework, but there’s quite a bit to it nonetheless. Since I tend to abandon side-projects
after a while, I decided to set myself some very clear and concise goals for this project to ensure I could finish it within a
reasonable amount of time.

* Do not use a real database, simply use in-memory arrays.
* `GET` endpoint that lists all data in the database.
* `POST` endpoint to add new entries to the database.
* `DELETE` endpoint to remove entries from the database.
* `UPDATE` endpoint to modify existing entries in the database.
* Host a very simple website that ties everything together.

## Serving static files
One of the things that took me quite a bit of time to figure out was how I could serve static files. Usually I’d just place my
`index.html` file in the `resources` folder and let Spring Boot take care of it.

It turned out that I had to serve files myself. It’s not terribly difficult, but it was something I didn’t completely
understand at first. However, after discovering that the `actix_files::Files::new()` function could simply serve an entire
directory, I managed to serve my static files (along with some CSS) just fine. The documentation was excellent, so it was
fairly easy to figure out after all.

The 404 error handler is just a generic HTML page with some information. Here’s how I implemented mine:

```rs
use actix_files::{NamedFile};
use actix_web::{web, App, HttpServer, HttpResponse, HttpRequest, Result};

// Serves a static file, CSS can be linked to that file thanks to the call to Files::new("/", "./static") in main()
async fn not_found(req: HttpRequest) -> Result<HttpResponse> {
    NamedFile::open("./static/not_found.html")?.into_response(&req)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(actix_files::Files::new("/", "./static").index_file("index.html"))
            .default_service(web::to(not_found))
    })
    .bind("127.0.0.1.:8000")
    .run()
    .await
}
```

Once I knew how to serve static files, it didn’t take me long to figure out how to serve a [React.js](https://reactjs.org)
website. With all this in place, I could get started on creating the endpoints and fetching data from the server.

## Handling payloads

In Spring Boot it is fairly easy to work with payloads. You generally only have to add some annotations to your route to make
it work.

In Actix.rs, things work slightly differently. Text can be received directly from the response body by simply adding it as a
parameter to the function.

Path variables can be retrieved by specifying it in the route declaration and wrapping it in a `web::Path<T>` object as a
function parameter.

Handling JSON payloads with Actix.rs wasn’t too difficult either. By using the [Serde.rs](https://serde.rs) crate, we can
easily serialize and de-serialize data.

## Final verdict

Overall, despite only having only played around with Actix.rs for a few hours, I’d say I’m really impressed by it. It was
fairly easy to get a webserver up and running, the documentation was excellent, and overall ease of use was fine.

My lack of knowledge of the Rust programming language itself really held me back. I felt like I didn’t quite understand the
borrow checker, neither did I fully understand the different strings and the like. Nothing a Google search can’t fix, though!

Also, working with Cargo was awesome. It’s as easy and user-friendly as [NuGet](https://www.nuget.org). I absolutely love how
easy it is to grab some crates.

The one thing that bothers me with Rust, though, is the lack of debugging tools. Sure, there are extensions to take care of
this (and the Visual Studio Code extension is good), but it’s nowhere near the level of debugging I can do in IntelliJ or
Visual Studio. Debugging in Visual Studio Code just isn’t quite there yet…

But hey, overall, I had a really good time and I’ll definitely want to play around with Rust in the future.

Who knows, perhaps I’ll be able to convince my team members to let me write one of the microservices in Rust instead of Java.
😉
