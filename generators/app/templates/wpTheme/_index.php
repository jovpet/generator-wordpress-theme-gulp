<?php
/**
 * The template for displaying about us page.
 *
 * This is the template that displays all pages by default.
 *
 * @package <%= name %>
 */

get_header();

if ( have_posts() ) :

    /* Start the Loop */
    while ( have_posts() ) : the_post();
        ?>
        <div class="default-page">
            <div class="container">
                <div class="section-title">
                    <h1><?php the_title(); ?></h1>
                </div>
                <div class="content">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
        <?php
    endwhile;


else :

    get_template_part( 'template-parts/content', 'none' );

endif;

get_footer();