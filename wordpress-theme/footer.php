</main>

<footer class="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div class="col-span-1 md:col-span-1">
                <div class="flex items-center gap-2 mb-6">
                    <span class="text-xl font-bold">1st Class Advanced Co.</span>
                </div>
                <p class="text-gray-400 mb-6">
                    <?php esc_html_e('Trusted partner in sourcing, import, export, and international shipping.', 'first-class'); ?>
                </p>
                <!-- Social links can be added via customizer or widgets -->
            </div>
            
            <div>
                <h4 class="text-lg font-semibold mb-4"><?php esc_html_e('Quick Links', 'first-class'); ?></h4>
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'footer-menu',
                    'container' => false,
                    'menu_class' => 'space-y-3 text-gray-400',
                    'fallback_cb' => false,
                    'depth' => 1,
                ));
                ?>
            </div>
            
            <div>
                <h4 class="text-lg font-semibold mb-4"><?php esc_html_e('Contact Us', 'first-class'); ?></h4>
                <ul class="space-y-4 text-gray-400">
                    <li class="flex items-start gap-3">
                        <i data-lucide="map-pin" class="w-5 h-5 text-primary mt-1"></i>
                        <span><?php esc_html_e('King Abdullah Road, Saudi Arabia', 'first-class'); ?></span>
                    </li>
                    <li class="flex items-center gap-3">
                        <i data-lucide="phone" class="w-5 h-5 text-primary"></i>
                        <span dir="ltr">+966 506963669</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <i data-lucide="mail" class="w-5 h-5 text-primary"></i>
                        <span>info@1stclass.com.sa</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>&copy; <?php echo date('Y'); ?> 1st Class Advanced Co. <?php esc_html_e('All rights reserved.', 'first-class'); ?></p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
<script>
  // Initialize Lucide icons
  lucide.createIcons();
</script>
</body>
</html>
