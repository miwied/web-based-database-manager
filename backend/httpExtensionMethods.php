<?php
class HttpExtensionMethods
{
    /**
     * Get URI elements.
     * 
     * @return array
     */
    public static function getUriSegments()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode('/', $uri);

        return $uri;
    }

    public static function sendOutput($code, $data = null)
    {
        header_remove('Set-Cookie'); // make sure that no cookie is set

        header('Content-Type: application/json', true, $code);

        echo $data;
        exit;
    }
}
