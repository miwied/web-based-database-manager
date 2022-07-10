<?php
class HttpExtensionMethods
{
    // split url and return it as uri-array
    public static function getUriSegments()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode('/', $uri);

        return $uri;
    }

    // send http errors with optional data / msg
    public static function sendOutput($code, $data = null)
    {
        header_remove('Set-Cookie'); // make sure that no cookie is set

        header('Content-Type: application/json', true, $code);

        echo $data;
        exit;
    }
}
