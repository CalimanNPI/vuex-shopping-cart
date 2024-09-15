<template>
    <div class="box">
        <div class="cart-item__details">
            <p class="is-inline">{{ cartItem.title }}</p>
            <div>
                <span class="cart-item--price has-text-info has-text-weight-bold">
                    ${{ cartItem.price }} X {{ cartItem.quantity }}
                </span>

                <span>
                    <button class="button is-primary" @click="addCartItem(cartItem)">+</button>
                    <button class="button is-danger" @click="removeCartItem(cartItem)">-</button>
                </span>
            </div>

        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'CartListItem',
    props: ['cartItem'],
    methods: {
        ...mapActions(['addCartItem', 'removeCartItem'])
    }
}
</script>