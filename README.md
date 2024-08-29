<------------------------------------------------------------>
Nota
Vesión de Node.js = 16.14.2
Uso del framework Express.
<------------------------------------------------------------>

Módulos a desarrollar en la API
• Módulo de gestión de perfiles de usuarios: Permitirá elegir roles mediante opciones y
manejará dos perfiles: técnicos externos, para usuarios que deseen que solo deseen observar
los procesos internos, pero no tendrán permiso para realizar alguna modificación, y personal
encargado, este será el usuario administrador, el cual tendrá los permisos correspondientes
para manipular los datos del sistema.
• Módulo de control de ingreso: Este módulo permitirá llevar la contabilidad de la cantidad de
material orgánico e impropio ingresados a la planta.
• Módulo de gestión de datos: El personal técnico, ingresará, eliminará y modificará los datos
variables que presenta el abono en el proceso de elaboración de compostaje.
• Módulo de despacho: En este módulo se almacenarán las pilas que ya hayan finalizado si
proceso de compostaje, además el técnico podrá agregar el destinatario final del compost.
• Módulo notificaciones: El personal técnico recibirá la notificación de la actividad y fase en
la que se encuentra cada una de las pilas en tratamiento.
• Módulo de reportes: El sistema permitirá el despliegue de reportes, clasificados por fechas y
campos específicos al módulo. 

Diagrama de casos de uso

![image](https://github.com/user-attachments/assets/77c9e1d8-1e02-40b4-b301-56e881def1d5)



Modelo de la base de datos


![image](https://github.com/user-attachments/assets/52c391a9-53a4-4b0f-9e38-b563c73310d5)

