<?php
/**
 * Orbit Slider Settings
 * posts_per_page (integer: -1 | 10) If -1 is set, all posts will be included, otherwise, number of posts ili limited
 * by number
 **/
$args['posts_per_page'] = -1;
$args['post_type'] = 'slide';
$args['orderby'] = 'menu_order';
$args['order'] = 'ASC';
$slides = new WP_Query($args);

if($slides->have_posts()){ ?>
    <section class="orbit before-init" role="region" aria-label="Favorite Text Ever" data-orbit>
        <ul class="orbit-container">
            <?php while($slides->have_posts()){
                $slides->the_post();
                $slideID = get_the_ID();
                $link = get_post_meta($slideID, '_slider_link', true); ?>
                <li class="orbit-slide" aria-label="<?php echo esc_attr(get_the_title()); ?>">
                    <?php if($link != ''){ echo '<a href="'.$link.'">'; }
                    the_post_thumbnail('full', array('class' => 'orbit-image'));
                    if($link != ''){ echo '</a>'; }
                    ?>
                </li>
            <?php } wp_reset_postdata(); ?>
            <button class="orbit-previous"><span class="show-for-sr"><?php _e('Previous Slide', '<%= name %>'); ?></span></button>
            <button class="orbit-next"><span class="show-for-sr"><?php _e('Next Slide', '<%= name %>'); ?></span></button>
        </ul>
    </section>
<?php }