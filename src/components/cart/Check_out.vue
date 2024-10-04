<template>
    <div id="cart">
        <table class="table is-bordered container">
            <thead>
                <tr>
                    <th> descripción</th>
                    <th> cantidad</th>
                    <th> precio unitario</th>
                    <th> precio total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cartItem in cartItems" :key="cartItem.id">
                    <Checkout_Item :cartItem="cartItem" />
                </tr>
            </tbody>
        </table>
        <div class="notification is-success">
            <p>
                Total Quantity:
                <span class="has-text-weight-bold">{{ cartTotal }}</span>
            </p>
        </div>
        <br>
    </div>

    <div class="grid">
        
        <div class="cell">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <div class="media-content">
                            <p class="title is-4">Factura</p>
                            <p class="subtitle is-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellusneciaculis mauris.
                            </p>
                        </div>
                    </div>
                    <div class="content">
                        <div class="select">
                            <select v-model="bill">
                                <option value="ticket" selected>Ticket</option>
                                <option value="bill">Factura</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cell">
            <div class="card">
                <div class="card-content">

                    <div class="content">
                        <div class="media-content">
                            <p class="title is-4">Tipo de entrega</p>
                            <p class="subtitle is-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                                neciaculis mauris. </p>
                        </div>
                    </div>

                    <div class="content is-flex is-flex-direction-column">
                        <div class="content">
                            <div class="select">
                                <select v-model="shipping">
                                    <option value="1" selected>recoger</option>
                                    <option value="2">a domicilio </option>
                                </select>
                            </div>
                        </div>

                        <div class="content">
                            <div class="select" v-if="shipping == 2">
                                <select v-model="deliverys">
                                    <option v-for="item in delivery" :key="item.id" :value="item.id">
                                        {{ item.delivery }}
                                    </option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="cell">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <div class="media-content">
                            <p class="title is-4">subtotal: {{ cartTotal }}</p>
                            <p class="title is-4">envio: {{ priceShipping }}</p>
                            <p class="title is-4">Total (IVA Incluido): {{ sum() }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <label class="checkbox">
                            <input type="checkbox" v-model="terms" />
                            Acepto los <a href="#">Términos y condiciones</a>
                        </label>

                        <label class="checkbox" v-if="bill != 'bill'">
                            <input type="checkbox" v-model="facts" />
                            Confirmo que no necesito Factura
                        </label>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-content">
                    <div class="content is-flex is-justify-content-center">
                        <RouterLink to="/payouts" class="button is-primary is-dark">Continuar con el pago</RouterLink>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import Checkout_Item from './Checkout_Item.vue';

export default {
    name: "checkOut",
    data() {
        return {
            deliveryPrices: [],
            shipping: 1,
            bill: "", // Factura o Ticket
            terms: "", // Acepto los Términos y condiciones
            facts: "", // Confirmo que no necesito Factura
            priceShipping: 0.0,
            deliverys: "",
            total: ""
        }
    },
    components: {
        Checkout_Item,
    },
    computed: {
        ...mapGetters(["cartItems", "cartTotal", "cartQuantity", "delivery", "totalCart"]),
    },
    created() {
        this.$store.dispatch("getDeliverys");
        this.$store.dispatch("getCartItems");
    },
    methods: {
        sum() {
            this.total = parseFloat(this.cartTotal) + parseFloat(this.priceShipping)
            this.$store.commit('UPDATE_TOTAL', { 'cart': parseFloat(this.cartTotal), 'deliverys': parseFloat(this.priceShipping), 'total': this.total })
            return this.total;
        }
    },
    watch: {
        shipping: function (val) {
            if (val == 1) {
                this.priceShipping = 0.0;
            }
        },
        deliverys: function (val) {
            this.delivery.filter((item) => { if (item.id == val) this.priceShipping = item.price });
        }
    }
}
</script>