<?php get_header(); ?>

<!-- Hero Section -->
<section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
    <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-50/90 to-slate-50/90"></div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                    <?php esc_html_e('Your Trusted Partner in Global Sourcing & Logistics', 'first-class'); ?>
                </h1>
                <p class="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl">
                    <?php esc_html_e('We provide professional import, export, and international shipping solutions tailored for businesses of all sizes.', 'first-class'); ?>
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="#services" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
                        <?php esc_html_e('Our Services', 'first-class'); ?>
                    </a>
                    <a href="#contact" class="bg-white hover:bg-gray-50 text-slate-900 border border-gray-200 font-medium py-3 px-8 rounded-lg transition-colors">
                        <?php esc_html_e('Contact Us', 'first-class'); ?>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Content Block -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <?php
    if (have_posts()) :
        while (have_posts()) : the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('prose lg:prose-xl max-w-none'); ?>>
                <?php the_content(); ?>
            </article>
            <?php
        endwhile;
    else :
        ?>
        <p><?php esc_html_e('Sorry, no content found.', 'first-class'); ?></p>
        <?php
    endif;
    ?>
</div>

<?php get_footer(); ?>
