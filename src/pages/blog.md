---
layout: blog.njk
title: Blog
permalink: /blog/
pagination:
  data: collections.posts
  size: 5
  alias: post
---

# Blog

<ul>
  {% for post in pagination.items %}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a> - {{ post.date | date("MMMM dd, yyyy") }}
    </li>
  {% endfor %}
</ul>

<nav>
  {% if pagination.previousPage %}
    <a href="{{ pagination.previousPageUrl }}">Previous</a>
  {% endif %}
  
  {% if pagination.nextPage %}
    <a href="{{ pagination.nextPageUrl }}">Next</a>
  {% endif %}
</nav>
