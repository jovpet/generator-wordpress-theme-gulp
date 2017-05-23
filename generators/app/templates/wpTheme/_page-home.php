<?php
/**
 * The template for displaying home page.
 *
 * This is the template that displays home page. Add template parts after header located in template-parts directory
 *
 * @package <%= name %>
 * Template Name: Home page
 */
get_header();

<% if (phpCustomPosts) { %>get_template_part('template-parts/homepage', 'slider');<% } else { %>// include get_template_part('template-parts/template', 'name');
//where template is the prefix name of template and 'name' is suffix name (after -). also, remove this dummy content:
?>
<div class="row">
    <h1>Title of section</h1>
    <p>Here goes some dymmy content</p>
</div> <% } %>

get_footer();