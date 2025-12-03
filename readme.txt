Si usas Maven (pom.xml):
Añade lo siguiente a la sección <dependencies>:

XML

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

2. Configuración de Conexión (Archivos application.properties o application.yml)
Esta es la parte más crucial. Debes indicarle a Spring Boot dónde encontrar la base de datos, el usuario y la contraseña.

Dado que estás ejecutando Spring Boot directamente en tu máquina Windows (el host), debes usar la dirección localhost y el puerto mapeado 3306.

Opción A: Usando application.properties
Crea o edita el archivo en src/main/resources/application.properties y agrega estas líneas:

Properties

# URL de conexión: Usamos localhost porque Spring Boot se ejecuta en la máquina host
spring.datasource.url=jdbc:mysql://localhost:3306/PokemonCompany
spring.datasource.username=dokermysql
spring.datasource.password=Doc-SecApp24
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Configuración de Hibernate/JPA (opcional, pero útil)
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true


version: '3.8'
services:
  # Servicio de tu Aplicación Web (Frontend/Backend)
  app:
    build:
      context: ./pokemon # Correcto: Apunta a la carpeta 'pokemon'
      dockerfile: Dockerfile
    # CLAVE 1: Cambia el nombre del contenedor a algo descriptivo (ej. 'app-pokemon')
    container_name: Pokemon-Frontend 
    ports:
      - "8080:80" # Mapea el puerto de tu aplicación (ajusta si es necesario)
    environment:
      # ** VARIABLES DE ENTORNO PARA LA CONEXIÓN **
      # CLAVE: HOSTNAME: 'mysql-server' (nombre del contenedor MySQL existente)
      DB_HOST: mysql-server2
      DB_PORT: 3306
      DB_USER: root # Usas 'root' en MySQL Workbench
      DB_PASSWORD: Doc-SecApp24 # Contraseña de tu DB
      DB_NAME: PokemonCompani # Nombre de tu base de datos
    # CLAVE 2: Elimina la línea 'networks: - default' si no vas a usar el servicio 'db'. 
    # Docker Compose intentará usar la red por defecto del proyecto 'dockerproyect' automáticamente.
