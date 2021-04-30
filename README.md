# pp-rafael-cocone-back
proyecto backend

1.- Crea una ruta para poder agregar un nuevo registro de usuario.

POST http://localhost:4000/api/auth/signup

ejemplo de envio de datos en JSON
{   
    "name":"lucrecia",
    "email":"lucrecia@gmail.net",
    "telephone": "247-118-78-98",
    "password":"password123",
    "age":"26",
    "gender":"F",
    "hobby":"Videojuegos"

}

=========================================================================
2.- Crea una ruta para poder consultar a todos los usuarios.
Además, deberás agregar alguna forma para poder buscar a
usuarios por nombre y/o pasatiempo, todo bajo la misma ruta.

POST http://localhost:4000/api/users
(requiere que se envie un token x-access-token en el headers)

para utilizar, la busqueda con parametros; se envia un json; sino se envia nada hace un busqueda general
ejemplo
{
    "name":"rafael",
    "hobby":"Videojuegos"
}

===========================================================================

3.-Crea una ruta para poder borrar un registro de usuario.

DELETE http://localhost:4000/api/users/:userID
(requiere que se envie un token x-access-token en el headers)


===========================================================================
4.-Crea una ruta para consultar el nombre, teléfono, y pasatiempo de todos los
usuarios que sean mayores a 18 años, con un género ‘Femenino’, creados
en los últimos 3 días, agrupando a los usuarios resultantes por pasatiempo

http://localhost:4000/api/users/group/
(requiere que se envie un token x-access-token en el headers)

=================================================
NOTA: para  obtener x-access-token ingresar a la ruta

http://localhost:4000/api/auth/signin

requiere un objeto json con un email valido y constraseña

ejemplo
{
    "email":"lecha@gmail.net",
    "password":"password123"
}
