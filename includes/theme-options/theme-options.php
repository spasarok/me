<?php
// create custom plugin settings menu
add_action('admin_menu', 'kim_create_menu');

function kim_create_menu() {

    //create new top-level menu
    add_menu_page('Theme Options', 'Theme Options', 'administrator', __FILE__, 'kim_options_page' , plugins_url('/images/icon.png', __FILE__) );

    //call register settings function
    add_action( 'admin_init', 'kim_register_options' );
}

function kim_register_options() {
    //register our settings
    register_setting( 'kim_resume_fields', 'kim_skills' );
    register_setting( 'kim_resume_fields', 'kim_experience' );
    register_setting( 'kim_resume_fields', 'kim_outreach' );
}

function kim_options_page() {
    ?>
    <div class="wrap">
        <h2>Options</h2>

        <form method="post" action="options.php">
            <?php settings_fields( 'kim_resume_fields' ); ?>
            <?php do_settings_sections( 'kim_resume_fields' ); ?>

            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Skills</th>
                    <td><input type="text" class="large-text" name="kim_skills" value="<?php echo esc_attr( get_option('kim_skills') ); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Experience</th>
                    <td><input type="text" class="large-text" name="kim_experience" value="<?php echo esc_attr( get_option('kim_experience') ); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Outreach</th>
                    <td><input type="text" class="large-text" name="kim_outreach" value="<?php echo esc_attr( get_option('kim_outreach') ); ?>" /></td>
                </tr>
            </table>

            <?php submit_button(); ?>

        </form>
    </div>
<?php }
