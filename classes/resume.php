<?php

class Resume{

    /*
     * Get resume items from specified taxonomy
     */
    function query_cat($cat_slug){
        $args = array(
            'post_type' => 'kim_resume_item',
            'tax_query' => array(
                array(
                    'taxonomy' => 'resume_category',
                    'field' => 'slug',
                    'terms' => $cat_slug
                )
            )
        );
        return new WP_Query($args);
    }

    /*
     * Format skills to a list of Bootstrap kbd tags
     * Takes string of skills separated by commas as input
     */
    function kbd($tag_string){
        $tags = explode(', ', $tag_string);
        $out = "";

        for($n = 0; $n < count($tags); $n++){
            $out = $out.'<kbd>'.$tags[$n].'</kbd> ';
        }

        return $out;
    }
};