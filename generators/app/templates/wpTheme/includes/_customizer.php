<?php
function <%= name %>_customize_register( $wp_customize ) {
    //All our sections, settings, and controls will be added here

    $wp_customize->add_section(
        'general',
        array(
            'title'   => __('General Settings', '<%= name %>'),
            'priority'  => 101
        )
    );

    $wp_customize->add_setting(
        'telephones',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'telephones',
        array(
            'section'   => 'general',
            'label'   => __('Telephones', '<%= name %>'),
            'desc'   => __('Enter telephones', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 1
        )
    );
    $wp_customize->add_setting(
        'footer',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'footer',
        array(
            'section'   => 'general',
            'label'   => __('Footer copyright info', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 2
        )
    );
    $wp_customize->add_setting(
        'default_fb_image',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'default_fb_image',
        array(
            'section'   => 'general',
            'label'   => __('Default facebook image', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 2
        )
    );
    $wp_customize->add_setting(
        'facebook_app_id',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'facebook_app_id',
        array(
            'section'   => 'general',
            'label'   => __('Facebook App ID', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 2
        )
    );

    $wp_customize->add_setting(
        'google_analytics',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'google_analytics',
        array(
            'section'   => 'general',
            'label'   => 'Google analytics code',
            'type'    => 'textarea',
            'priority'   => 10
        )
    );

    //Pages
    $wp_customize->add_section(
        '<%= name %>_pages',
        array(
            'title'   => __('Website pages', '<%= name %>'),
            'priority'  => 503
        )
    );

    $wp_customize->add_setting(
        'page_contact',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'page_contact',
        array(
            'section'   => '<%= name %>_pages',
            'label'   => __('Contact', '<%= name %>'),
            'type'    => 'select',
            'choices' => <%= name %>_get_pages_array( 'page' ),
            'priority'   => 1
        )
    );

    //Social
    $wp_customize->add_section(
        'social_links',
        array(
            'title'   => __('Social links', '<%= name %>'),
            'priority'  => 503
        )
    );
    $wp_customize->add_setting(
        'social_yt',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'social_yt',
        array(
            'section'   => 'social_links',
            'label'   => __('YouTube', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 2
        )
    );
    $wp_customize->add_setting(
        'social_fb',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'social_fb',
        array(
            'section'   => 'social_links',
            'label'   => __('Facebook', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 1
        )
    );
    $wp_customize->add_setting(
        'social_tw',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'social_tw',
        array(
            'section'   => 'social_links',
            'label'   => __('Twitter', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 1
        )
    );
    $wp_customize->add_setting(
        'social_ld',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'social_ld',
        array(
            'section'   => 'social_links',
            'label'   => __('Linkedin', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 1
        )
    );

    <% if (phpSMTP) { %>
    //SMTP settings
    $wp_customize->add_section(
        'smtp',
        array(
            'title'   => __('SMTP settings', '<%= name %>'),
            'priority'  => 19999
        )
    );
    $wp_customize->add_setting(
        'smtp_host',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'smtp_host',
        array(
            'section'   => 'smtp',
            'label'   => __('SMTP host', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 1
        )
    );
    $wp_customize->add_setting(
        'smtp_username',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'smtp_username',
        array(
            'section'   => 'smtp',
            'label'   => __('SMTP username', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 1
        )
    );
    $wp_customize->add_setting(
        'smtp_from_email',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'smtp_from_email',
        array(
            'section'   => 'smtp',
            'label'   => __('SMTP email', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 1
        )
    );
    $wp_customize->add_setting(
        'smtp_password',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'smtp_password',
        array(
            'section'   => 'smtp',
            'label'   => __('SMTP password', '<%= name %>'),
            'type'    => 'password',
            'priority'   => 1
        )
    );
    $wp_customize->add_setting(
        'smtp_secure',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'smtp_secure',
        array(
            'section'   => 'smtp',
            'label'   => __('SMTP security', '<%= name %>'),
            'type'    => 'text',
            'description' => 'ssl/tsl/...',
            'priority'   => 1
        )
    );
    $wp_customize->add_setting(
        'smtp_port',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'smtp_port',
        array(
            'section'   => 'smtp',
            'label'   => __('SMTP port', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 1
        )
    );
    $wp_customize->add_setting(
        'smtp_contact_mail',
        array(
            'default'  =>  '',
            'transport'  =>  'postMessage'
        )
    );
    $wp_customize->add_control(
        'smtp_contact_mail',
        array(
            'section'   => 'smtp',
            'label'   => __('Receiving email', '<%= name %>'),
            'description' => __('Receiving email for Contact Page', '<%= name %>'),
            'type'    => 'text',
            'priority'   => 1
        )
    );
    <% } %>
}
add_action( 'customize_register', '<%= name %>_customize_register' );
?>