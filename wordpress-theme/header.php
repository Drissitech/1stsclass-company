<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: { DEFAULT: '#151543', hover: '#0B0B23' },
              secondary: { DEFAULT: '#C0822F', hover: '#A06D27' },
            }
          }
        }
      }
    </script>
</head>
<body <?php body_class('min-h-screen bg-slate-50 text-slate-900 font-sans'); ?>>
<?php wp_body_open(); ?>

<header class="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center gap-3">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-2">
                    <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">1st Class Advanced Co.</span>
                </a>
            </div>

            <!-- Main Navigation -->
            <nav class="hidden md:flex space-x-8 items-center" dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary-menu',
                    'container' => false,
                    'menu_class' => 'flex space-x-8',
                    'fallback_cb' => false,
                    'depth' => 1,
                ));
                ?>
            </nav>
        </div>
    </div>
</header>

<main class="pt-20">
