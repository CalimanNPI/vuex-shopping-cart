<template>

    <div class="is-flex is-flex-direction-column m-6">

        <div class="m-4">
            <div class="card">
                <header class="card-header">
                    <h1 class="card-header-title title is-4">Autenticación</h1>
                </header>
                <div class="card-content" v-if="!is_loggedin">
                    <div class="content is-flex is-justify-content-center">
                        <RouterLink to="/payouts" class="button is-primary is-dark">Continuar con el pago</RouterLink>
                    </div>
                </div>
            </div>
        </div>

        <div class="m-4">
            <form class="card" @submit.prevent="form">
                <header class="card-header">
                    <h1 class="card-header-title title is-4">Dirección de envío</h1>
                </header>
                <div class="card-content" v-if="is_loggedin && !isAddress">
                    <input class="input is-medium" type="text" name="stret" v-model="address.calle"
                        placeholder="calle" />
                    <input class="input is-medium" type="text" name="number" v-model="address.numero"
                        placeholder="numero" />
                    <input class="input is-medium" type="text" name="colony" v-model="address.colonia"
                        placeholder="colonia" />
                    <input class="input is-medium" type="text" name="state" v-model="address.municipio"
                        placeholder="municipio" />
                    <input class="input is-medium" type="text" name="country" v-model="address.estado"
                        placeholder="estado" />
                    <input class="input is-medium" type="text" name="cp" v-model="address.cp" placeholder="cp" />
                    <input class="input is-medium" type="email" name="email" v-model="address.correo"
                        placeholder="correo" />
                    <input class="input is-medium" type="text" name="phone" v-model="address.telefono"
                        placeholder="telefono" />
                    <input class="input is-medium" type="text" name="name" v-model="address.nombre"
                        placeholder="nombre" />
                    <input class="input is-medium" type="text" name="lastname" v-model="address.apellidos"
                        placeholder="apellidos" />
                    <textarea class="textarea" placeholder="comentario " v-model="address.otro"></textarea>
                    <div class="content is-flex is-justify-content-center p-6">
                        <button class="button is-primary is-dark">Continuar</button>
                    </div>
                </div>

            </form>
        </div>

        <div class="m-4">

            <div class="card">
                <header class="card-header">
                    <h1 class="card-header-title title is-4">Opción de compra</h1>
                </header>
                <div class="card-content" v-if="is_loggedin && isAddress">
                    <div class="content is-flex is-justify-content-center">
                        <button class="button is-primary is-dark" @click="pay">Pagar</button>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { MercadoPagoConfig, Payment } from 'mercadopago';

export default {
    name: "checkOut",
    data() {
        return {
            address: {
                calle: "",
                numero: "",
                colonia: "",
                municipio: "",
                estado: "",
                cp: "",
                correo: "",
                telefono: "",
                nombre: "",
                apellidos: "",
                otro: "",
            },
            isAddress: false,
        }
    },
    components: {},
    computed: {
        ...mapGetters(["is_loggedin"]),
    },
    created() {
        this.$store.dispatch("logged");
    },
    methods: {
        form() {
            this.isAddress = true;
        },
        pay() {
            const client = new MercadoPagoConfig({ accessToken: '579552254810800', options: { timeout: 5000, idempotencyKey: '1051940551' } });

            // Step 3: Initialize the API object
            const payment = new Payment(client);


            // Step 4: Create the request object
            const body = {
                transaction_amount: 12.34,
                description: 'Pagos',
                payment_method_id: 'debit_card',
                payer: {
                    email: 'carlos.cdms.c@gmail.com'
                },
            };
            ///
            ///  // Step 5: Create request options object - Optional
            const requestOptions = {
                idempotencyKey: '1051940551',
            };
            ///
            ///  // Step 6: Make the request
            payment.create({ body, requestOptions }).then(console.log).catch(console.log);
        }
    },
    watch: {}
}
</script>