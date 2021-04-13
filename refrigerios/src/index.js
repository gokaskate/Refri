const express = require('express');
const path = require('path');

const pool = require('./database');

//Iniciar
const app = express();

//Ajustes
app.set('port', process.env.port || 4000);

//Middelewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));

//Variables Globales
app.use((req, res, next) => {
    next();
})

//Rutas
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'));
    //__dirname : It will resolve to your project folder.

});

//Insercion de datos usuarios beneficiados
app.post('/benefic', async(req, res) => {
    try {
        const result = await pool.query('INSERT INTO users_benefic set ?', [req.body])
        res.sendFile(path.join(__dirname + '/public/mensajebueno.html'));
    } catch (error) {
        res.sendFile(path.join(__dirname + '/public/mensajemalo.html'));
    }

})

//Insercion de datos refrigerios
app.post('/refris', async(req, res) => {
    try {
        const result = await pool.query('INSERT INTO refrigerios set ?', [req.body])
        res.sendFile(path.join(__dirname + '/public/mensajebueno.html'));
    } catch (error) {
        res.sendFile(path.join(__dirname + '/public/mensajemalo.html'));
    }

})

//Insercion de datos refrigerios entregados
app.post('/entrega', async(req, res) => {
    try {
        const result = await pool.query('INSERT INTO refris_entregados set ?', [req.body])
        res.sendFile(path.join(__dirname + '/public/mensajebueno.html'));
    } catch (error) {
        res.sendFile(path.join(__dirname + '/public/mensajemalo.html'));
    }

})

// Extraccion de datos
// tabla 1
app.get('/datos', async(req, res) => {
    const tables = await pool.query('SELECT * FROM users_benefic')
    const pintafila = () => {
        return tables.map((fila) => {
            return `<tr>
            <td> ${fila.id} </td>
            <td> ${fila.nombres} </td>
            <td> ${fila.curso} </td>
            <td> ${fila.representante} </td>
            <td> ${fila.estado_refri} </td>
            </tr>`
        }).join("")
    }
    const view = `<html> 
                        <head> 
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                        <title>OEA</title>
                        <link href="styles/styles.css" rel="stylesheet" type="text/css">
                        </head>
                        <body>

                        <section id="Banner" class="content-section">
                            <div class="container content-wrap text-center">
                                <h2>Manejo De Refrigerios Estudiantil OEA</h2>
                                <h3> Estudiantes Beneficiados</h3>
                                <br>
                                <br
                                <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Documento</th>
                                            <th scope="col">Nombres</th>
                                            <th scope="col">Curso</th>
                                            <th scope="col">Representante</th>
                                            <th scope="col">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${pintafila()}
                                    </tbody>
                                </table>
                                <br>
                                <br>
                                <a class="btn btn-primary btn-xl smooth-scroll" href="/homie">Regresar</a>
                            </div>
                             </div>
                                <div class="overlay"></div>
                            </section>
                            
                        </body>
                    
                </html>`
    res.send(view);
});

//tabla2
app.get('/datos2', async(req, res) => {
    const tables = await pool.query('SELECT * FROM refris_entregados')
    const pintafila = () => {
        return tables.map((fila) => {
            return `<tr>
            <td> ${fila.id} </td>
            <td> ${fila.nombre_refris} </td>
            <td> ${fila.hora_entrega} </td>
            <td> ${fila.sobrantes} </td>
            </tr>`
        }).join("")
    }
    const view = `<html> 
                        <head> 
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                        <title>OEA</title>
                        <link href="styles/styles.css" rel="stylesheet" type="text/css">
                        </head>
                        <body>

                        <section id="Banner" class="content-section">
                            <div class="container content-wrap text-center">
                                <h2>Manejo De Refrigerios Estudiantil OEA</h2>
                                <h3> Refrigerios Entregados</h3>
                                <br>
                                <br
                                <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Nombre Refrigerio</th>
                                            <th scope="col">Hora De Entrega</th>
                                            <th scope="col">Excedente</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${pintafila()}
                                    </tbody>
                                </table>
                                <br>
                                <br>
                                <a class="btn btn-primary btn-xl smooth-scroll" href="/home.html">Regresar</a>
                            </div>
                             </div>
                                <div class="overlay"></div>
                            </section>
                            
                        </body>
                    
                </html>`
    res.send(view);
});

//Tabla 3
app.get('/datos3', async(req, res) => {
    const tables = await pool.query('SELECT * FROM refrigerios')
    const pintafila = () => {
        return tables.map((fila) => {
            return `<tr>
            <td> ${fila.id} </td>
            <td> ${fila.nombre_refri} </td>
            <td> ${fila.cantidad} </td>
            <td> ${fila.hora_llegada} </td>
            </tr>`
        }).join("")
    }
    const view = `<html> 
                        <head> 
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                        <title>OEA</title>
                        <link href="styles/styles.css" rel="stylesheet" type="text/css">
                        </head>
                        <body>

                        <section id="Banner" class="content-section">
                            <div class="container content-wrap text-center">
                                <h2>Manejo De Refrigerios Estudiantil OEA</h2>
                                <h3> Refrigerios</h3>
                                <br>
                                <br
                                <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Nombres Refrigerios</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Hora De Llegada</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${pintafila()}
                                    </tbody>
                                </table>
                                <br>
                                <br>
                                <a class="btn btn-primary btn-xl smooth-scroll" href="/home.html">Regresar</a>
                            </div>
                             </div>
                                <div class="overlay"></div>
                            </section>
                            
                        </body>
                    
                </html>`
    res.send(view);
});


//Botones tablas
app.get('/homie', async(req, res) => {
    res.sendFile(path.join(__dirname + '/public/home.html'));

})


// Autenticacion
app.get('/login', async(req, res) => {
    res.sendFile(path.join(__dirname + '/public/login.html'));

})

app.post('/principal', async(req, res) => {
    const { id, password } = req.body
    try {
        const tables = await pool.query(`SELECT id, password FROM registro_users WHERE id=${id} and password=${password}`)
        res.sendFile(path.join(__dirname + '/public/home.html'));
    } catch (error) {
        res.sendFile(path.join(__dirname + '/public/mensajemalo.html'));

    }

})

//Start
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});