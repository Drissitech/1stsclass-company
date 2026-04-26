<?php
/**
 * First Class Advanced Theme Functions
 */

function firstclass_theme_scripts() {
    // Enqueue Tailwind CSS via CDN for development, or a compiled stylesheet for production
    wp_enqueue_script('tailwindcss', 'https://cdn.tailwindcss.com', array(), '3.4.0', false);
    
    // Theme stylesheet
    wp_enqueue_style('firstclass-style', get_stylesheet_uri());
    
    // Lucide Icons
    wp_enqueue_script('lucide', 'https://unpkg.com/lucide@latest', array(), null, true);
}
add_action('wp_enqueue_scripts', 'firstclass_theme_scripts');

function firstclass_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));

    // Register Menu
    register_nav_menus(array(
        'primary-menu' => __('Primary Menu', 'first-class'),
        'footer-menu' => __('Footer Menu', 'first-class')
    ));
}
add_action('after_setup_theme', 'firstclass_theme_setup');

?>
