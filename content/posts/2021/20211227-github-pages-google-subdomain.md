+++
author = "Tahar Meijs"
date = "2021-12-27"
title = "Configure GitHub Pages to use a Google subdomain"
featuredImage = "/images/2021/github-pages-google-subdomain/cover.png"
+++

# Configure GitHub Pages to use a Google subdomain
Lately, I've been working a lot on my online presence. I like to share knowledge and show other developers what I'm working on in
my spare time. One of my projects ([Jadis](https://github.com/tntmeijs/jadis) - a JVM disassembler written in Rust) needed its
own homepage.

I'd be broke by now if I were to buy a new domain name for every project I create. To save some cash, I decided to use a
subdomain instead.

This blog post will cover how to set up a subdomain with [Google Domains](https://domains.google). I noticed that there are not
that many resources out there that show you how to configure a subdomain with Github pages. This article aims to fill that void.

## Prerequisites
This project is pretty straightforward. All you'll need are a domain and a website that needs to be published. In my case, I'll
be using my [tahar.dev](https://tahar.dev) domain. The content I'm going to host is some automatically generated documentation
for my Rust project.

## Configure your subdomain
Before we'll configure GitHub, we need to ensure that we have a valid subdomain. Head on over to
[Google Domains](https://domains.google) and open your domain's settings.

In the left panel, navigate to `DNS`. This should bring you to a page that shows you your `resource records`.

Add your new subdomain:
1. Click on `manage custom records` and select `create new record`.
2. Your hostname should be your subdomain's name. I would like to create [jadis.tahar.dev](https://jadis.tahar.dev), so I'll
   enter `jadis` in the `host name` field.
3. The `type` should be `CNAME`.
4. Our `TTL` can be set to **one hour**, or `3600` seconds.
5. The `data` field should point to your existing domain. In my case, this is `tahar.dev`.

If you followed the steps outlined above, you should end up with a new DNS entry that looks somewhat like this:

![custom dns record](/images/2021/github-pages-google-subdomain/custom_dns_record.png)

Note that DNS changes usually take a bit of time to propagate. If you run into any issues where the DNS name cannot be resolved,
chances are you need to wait for a bit. In my case, however, the DNS records only took a minute to update.

## Configure GitHub Pages
Now that we have a subdomain we can use, it's time to configure our GitHub Pages website!

Once you've exported your website's files to the correct folder, you can start configuring GitHub Pages.

1. Open up your repository on GitHub, click `settings`.
2. Select `pages` from the navigation panel on the left of the page. This will open all settings related to GitHub Pages.
   
   ![settings](/images/2021/github-pages-google-subdomain/github_pages_settings.png)
3. A website hosted with GitHub Pages needs its `index.html` file to be located in either the repository's root folder or inside
   of a folder called `docs`. Since I host my code in the same repository as my GitHub Pages website, I decided to place my website's files inside `/docs`.
   
   ![website root folder](/images/2021/github-pages-google-subdomain/website_root_folder.png)
4. I like to serve my website from the `master` branch, but you can use whatever branch you'd like.
   
   ![select a source branch](/images/2021/github-pages-google-subdomain/select_source_branch.png)
5. Also make sure to select the correct root folder.
   
   ![select a root folder](/images/2021/github-pages-google-subdomain/select_root_folder.png)
6. There's no need to select a theme as we will be using our source files in our root folder.
7. In the `custom domain` field, enter the subdomain you've just created. I'm going to use `jadis.tahar.dev`.

Once you've entered your custom domain, GitHub will automatically create a new commit on the branch you selected as your source
branch. This commit will add a new file to your repository: `CNAME`. Without this file, GitHub Pages won't work as it is needed
to properly resolve your domain.

You will likely also see a pop-up that shows you that GitHub is checking your DNS configuration. Once it's done, you should see
a success message that looks somewhat like this:

![success message](/images/2021/github-pages-google-subdomain/success.png)

Lastly, make sure to request an HTTPS certificate from GitHub. It's as simple as checking the `Enforce HTTPS` checkbox.

![enforce https](/images/2021/github-pages-google-subdomain/enforce_https.png)

# Closing words
Aaaaand... that's it! Congratulations, you've now published your GitHub Pages website and hosted it on your very own subdomain. 😊

If you run into any errors, please make sure to double-check your DNS settings. It's a bit finicky and easy to mess up your configuration.

For GitHub Pages specific help, I'd highly recommend checking out their
[documentation](https://docs.github.com/en/pages). It's pretty solid and contains everything you need to configure GitHub Pages.

Alrighty, that's it for now. Hopefully, I was able to help you out with GitHub Pages.

Cheers!
