# wordpress-wechat


需要在wordpress中新增一个自定义函数

放在您模板的functions.php中

```php
function ws_register_other_field() {
    register_rest_field( 
        'post',
        'other',
        array(
            'get_callback'    => 'ws_get_other_func',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

add_action( 'rest_api_init', 'ws_register_other_field' );

function ws_get_other_func( $object, $field_name, $request ) {
    $medium = wp_get_attachment_image_src( get_post_thumbnail_id( $object->id ), 'medium' );
    $medium_url = $medium['0'];

    $large = wp_get_attachment_image_src( get_post_thumbnail_id( $object->id ), 'large' );
    $large_url = $large['0'];

    $views = get_post_meta(get_the_ID(),'views',true);

    return array(
        'medium' => $medium_url,
        'large'  => $large_url,
        'views'  => $views,
    );
}
```