package com.nexusgear.service;

import com.nexusgear.dto.CheckoutRequest;
import com.nexusgear.dto.OrderResponse;
import com.nexusgear.model.Order;
import com.nexusgear.model.OrderItem;
import com.nexusgear.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional
    public OrderResponse createOrder(CheckoutRequest req) {
        Order order = new Order();
        String orderNum = "NX-" + (10000 + new Random().nextInt(90000)) + "-PR";
        order.setOrderNumber(orderNum);
        order.setCustomerName(req.getCustomerName());
        order.setCustomerEmail(req.getCustomerEmail());
        order.setShippingAddress(req.getShippingAddress());
        order.setTotalAmount(req.getTotalAmount());
        order.setStatus("CONFIRMED");

        if (req.getItems() != null) {
            for (CheckoutRequest.OrderItemDto itemDto : req.getItems()) {
                OrderItem item = new OrderItem(
                        itemDto.getProductId(),
                        itemDto.getProductName(),
                        itemDto.getPrice(),
                        itemDto.getQuantity()
                );
                item.setOrder(order);
                order.getItems().add(item);
            }
        }

        Order saved = orderRepository.save(order);
        return mapToResponse(saved);
    }

    public Optional<OrderResponse> getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber).map(this::mapToResponse);
    }

    public List<OrderResponse> getOrdersByCustomerEmail(String email) {
        return orderRepository.findByCustomerEmailOrderByCreatedAtDesc(email)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private OrderResponse mapToResponse(Order o) {
        OrderResponse res = new OrderResponse();
        res.setId(o.getId());
        res.setOrderNumber(o.getOrderNumber());
        res.setCustomerName(o.getCustomerName());
        res.setCustomerEmail(o.getCustomerEmail());
        res.setShippingAddress(o.getShippingAddress());
        res.setTotalAmount(o.getTotalAmount());
        res.setStatus(o.getStatus());
        res.setCreatedAt(o.getCreatedAt());

        if (o.getItems() != null) {
            res.setItems(o.getItems().stream().map(i ->
                new CheckoutRequest.OrderItemDto(i.getProductId(), i.getProductName(), i.getPrice(), i.getQuantity())
            ).collect(Collectors.toList()));
        }
        return res;
    }
}
