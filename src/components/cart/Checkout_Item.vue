<template>
    <td>{{ cartItem.title }}</td>
    <td>{{ cartItem.quantity }}</td>
    <td>{{ cartItem.price }}</td>
    <td>{{ cartItem.price * cartItem.quantity }}</td>
</template>
<script>
export default {
    name: 'CartListItem',
    props: ['cartItem'],

}
</script>