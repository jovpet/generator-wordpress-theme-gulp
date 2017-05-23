<?php

function wp_seo_fields_get_meta( $value ) {
    global $post;

    $field = get_post_meta( $post->ID, $value, true );
    if ( ! empty( $field ) ) {
        return is_array( $field ) ? stripslashes_deep( $field ) : stripslashes( wp_kses_decode_entities( $field ) );
    } else {
        return false;
    }
}

function wp_seo_fields_add_meta_box() {
    add_meta_box(
        'wp_seo_fields-wp-seo-fields',
        __( 'SEO fields', '<%= name %>' ),
        'wp_seo_fields_wp_seo_fields_html',
        'post',
        'side',
        'high'
    );
    add_meta_box(
        'wp_seo_fields-wp-seo-fields',
        __( 'SEO fields', '<%= name %>' ),
        'wp_seo_fields_wp_seo_fields_html',
        'page',
        'side',
        'high'
    );
}
add_action( 'add_meta_boxes', 'wp_seo_fields_add_meta_box' );

function wp_seo_fields_wp_seo_fields_html( $post) {
    wp_nonce_field( '_wp_seo_fields_wp_seo_fields_nonce', 'wp_seo_fields_wp_seo_fields_nonce' ); ?>

    <p><?php _e( 'SEO fields for page', '<%= name %>' ); ?></p>

    <p>
        <label for="wp_seo_fields_wp_seo_fields_wp_title"><?php _e( 'Page Title', '<%= name %>' ); ?></label><br>
        <input style="margin: 0; width: 98%" type="text" type="text" name="wp_seo_fields_wp_seo_fields_wp_title" id="wp_seo_fields_wp_seo_fields_wp_title" value="<?php echo wp_seo_fields_get_meta( 'wp_seo_fields_wp_seo_fields_wp_title' ); ?>">
        <span id="seo_title_counter"></span>
    </p>  <p>
        <label for="wp_seo_fields_wp_seo_fields_wp_description"><?php _e( 'Page description', '<%= name %>' ); ?></label><br>
        <textarea style="margin: 0; width: 98%" cols="40" rows="3" name="wp_seo_fields_wp_seo_fields_wp_description" id="wp_seo_fields_wp_seo_fields_wp_description"><?php echo wp_seo_fields_get_meta( 'wp_seo_fields_wp_seo_fields_wp_description' ); ?></textarea>
        <span id="textarea_counter"></span>
    </p>
    <script type="text/javascript">
      jQuery(document).ready(function() {
        jQuery('#wp_seo_fields_wp_seo_fields_wp_description').on('input', function() {
          var clss = '';
          var left = 160 - jQuery(this).val().length;
          console.log(left);
          if (left <= 0) {
            clss = 'red';
          } else if (left < 16 && left > 0) {
            clss = 'orange';
          } else if (left >= 15 ) {
            clss = 'green'
          }
          else clss = '';
          jQuery('#textarea_counter').removeClass('red orange green');
          jQuery('#textarea_counter').addClass(clss);
          jQuery('#textarea_counter').text(<?php _e('Characters Left: ', '<%= name %>') ?> + left);
        });

        jQuery('#wp_seo_fields_wp_seo_fields_wp_title').on('input', function() {
          var clss = '';
          var left = 55 - jQuery(this).val().length;
          console.log(left);
          if (left <= 0) {
            clss = 'red';
          } else if (left < 26 && left > 0) {
            clss = 'orange';
          } else if (left >= 25 ) {
            clss = 'green'
          }
          else clss = '';
          jQuery('#seo_title_counter').removeClass('red orange green');
          jQuery('#seo_title_counter').addClass(clss);
          jQuery('#seo_title_counter').text(<?php _e('Characters Left: ', '<%= name %>') ?> + left);
        });
      });
    </script><?php
}

function wp_seo_fields_wp_seo_fields_save( $post_id ) {
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! isset( $_POST['wp_seo_fields_wp_seo_fields_nonce'] ) || ! wp_verify_nonce( $_POST['wp_seo_fields_wp_seo_fields_nonce'], '_wp_seo_fields_wp_seo_fields_nonce' ) ) return;
    if ( ! current_user_can( 'edit_post' ) ) return;

    if ( isset( $_POST['wp_seo_fields_wp_seo_fields_wp_title'] ) )
        update_post_meta( $post_id, 'wp_seo_fields_wp_seo_fields_wp_title', esc_attr( $_POST['wp_seo_fields_wp_seo_fields_wp_title'] ) );
    if ( isset( $_POST['wp_seo_fields_wp_seo_fields_wp_description'] ) )
        update_post_meta( $post_id, 'wp_seo_fields_wp_seo_fields_wp_description', esc_attr( $_POST['wp_seo_fields_wp_seo_fields_wp_description'] ) );
}
add_action( 'save_post', 'wp_seo_fields_wp_seo_fields_save' );

/*
  Usage: wp_seo_fields_get_meta( 'wp_seo_fields_wp_seo_fields_wp_title' )
  Usage: wp_seo_fields_get_meta( 'wp_seo_fields_wp_seo_fields_wp_description' )
*/

<% if (phpCustomPosts) { %>
function <%= name %>_add_meta_box() {
    $screens = array( 'slide' );
    add_meta_box(
        '_slider_link',
        __( 'Slider link', '<%= name %>' ),
        '<%= name %>_meta_box_callback',
        $screens
    );
}
add_action( 'add_meta_boxes', '<%= name %>_add_meta_box' );
function <%= name %>_meta_box_callback( $post ) {
    wp_nonce_field( '<%= name %>_save_meta_box_data', '<%= name %>_meta_box_nonce' );
    $value = get_post_meta( $post->ID, '_slider_link', true );
    echo '<p><label for="<%= name %>_link">';
    _e('Link', '<%= name %>');
    echo '</label> ';
    echo '<input type="text" id="<%= name %>_link" name="<%= name %>_link" value="' . esc_attr( $value ) . '" size="50" /></p>';
}
function <%= name %>_save_meta_box_data( $post_id ) {
    if ( ! isset( $_POST['<%= name %>_meta_box_nonce'] ) ) {
        return;
    }
    if ( ! wp_verify_nonce( $_POST['<%= name %>_meta_box_nonce'], '<%= name %>_save_meta_box_data' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {
        if ( ! current_user_can( 'edit_page', $post_id ) ) {
            return;
        }
    } else {
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }
    }
    if ( ! isset( $_POST['<%= name %>_link'] ) ) {
        return;
    }
    update_post_meta( $post_id, '_slider_link', sanitize_text_field( $_POST['<%= name %>_link'] ) );
}
add_action( 'save_post', '<%= name %>_save_meta_box_data' );
<% } %>
?>
