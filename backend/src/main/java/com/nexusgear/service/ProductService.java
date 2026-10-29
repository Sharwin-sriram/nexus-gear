package com.nexusgear.service;

import com.nexusgear.model.Product;
import com.nexusgear.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts(String category, String brand, String search, Double minPrice, Double maxPrice, String sortBy) {
        List<Product> list = productRepository.findAll();

        if (category != null && !category.equalsIgnoreCase("All") && !category.isBlank()) {
            list = list.stream()
                    .filter(p -> p.getCategory().equalsIgnoreCase(category))
                    .collect(Collectors.toList());
        }

        if (brand != null && !brand.isBlank()) {
            list = list.stream()
                    .filter(p -> p.getBrand().equalsIgnoreCase(brand))
                    .collect(Collectors.toList());
        }

        if (search != null && !search.isBlank()) {
            String q = search.toLowerCase();
            list = list.stream()
                    .filter(p -> (p.getName() != null && p.getName().toLowerCase().contains(q)) ||
                                 (p.getCategory() != null && p.getCategory().toLowerCase().contains(q)))
                    .collect(Collectors.toList());
        }

        if (minPrice != null) {
            list = list.stream().filter(p -> p.getPrice() >= minPrice).collect(Collectors.toList());
        }
        if (maxPrice != null) {
            list = list.stream().filter(p -> p.getPrice() <= maxPrice).collect(Collectors.toList());
        }

        if ("priceLow".equalsIgnoreCase(sortBy)) {
            list.sort(Comparator.comparing(Product::getPrice));
        } else if ("priceHigh".equalsIgnoreCase(sortBy)) {
            list.sort(Comparator.comparing(Product::getPrice).reversed());
        } else if ("rating".equalsIgnoreCase(sortBy)) {
            list.sort(Comparator.comparing(Product::getRating, Comparator.nullsLast(Comparator.reverseOrder())));
        }

        return list;
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<String> getAllCategories() {
        List<String> categories = productRepository.findDistinctCategories();
        if (categories.isEmpty()) {
            return List.of("All", "Audio", "Keyboards", "Wearables", "Accessories");
        }
        return categories;
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updated) {
        return productRepository.findById(id).map(p -> {
            p.setName(updated.getName());
            p.setBrand(updated.getBrand());
            p.setCategory(updated.getCategory());
            p.setPrice(updated.getPrice());
            p.setOriginalPrice(updated.getOriginalPrice());
            p.setImageUrl(updated.getImageUrl());
            p.setStockQuantity(updated.getStockQuantity());
            p.setRating(updated.getRating());
            p.setBadge(updated.getBadge());
            p.setAvailableColors(updated.getAvailableColors());
            return productRepository.save(p);
        }).orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @PostConstruct
    public void seedInitialProducts() {
        if (productRepository.count() == 0) {
            List<Product> defaults = List.of(
                createInitialProduct("Apex Acoustic ANC Pro", "Nexus", "Audio", 199.99, 249.99, 4.9, "BESTSELLER", 45, "Black,Silver,Midnight"),
                createInitialProduct("Pulse Cyber Chrono Gen 3", "Nexus", "Wearables", 149.50, 179.99, 4.8, "NEW", 30, "Titanium,Graphite"),
                createInitialProduct("Vortex 75% Mechanical Board", "Nexus", "Keyboards", 119.00, 139.00, 4.9, "HOT", 25, "RGB,White-LED"),
                createInitialProduct("Aero Glide Wireless Mouse 4K", "Nexus", "Keyboards", 69.99, 89.99, 4.7, "POPULAR", 60, "Matte Black,Ghost White"),
                createInitialProduct("Titan GaN 120W Fast Hub", "Nexus", "Accessories", 54.00, 65.00, 4.6, "PRO", 80, "Charcoal"),
                createInitialProduct("Echo Beat Portable Hi-Fi", "Nexus", "Audio", 79.99, 99.99, 4.5, "SALE", 40, "Graphite,Teal"),
                createInitialProduct("Lumina RGB Ambient Lightbar", "Nexus", "Accessories", 45.00, 59.00, 4.8, "HOT", 50, "Aluminum"),
                createInitialProduct("Quantum Sound True Wireless", "Nexus", "Audio", 89.99, 119.99, 4.7, "BESTSELLER", 70, "Onyx,Frost")
            );
            productRepository.saveAll(defaults);
        }
    }

    private Product createInitialProduct(String name, String brand, String cat, double price, double origPrice, double rating, String badge, int stock, String colors) {
        Product p = new Product();
        p.setName(name);
        p.setBrand(brand);
        p.setCategory(cat);
        p.setPrice(price);
        p.setOriginalPrice(origPrice);
        p.setRating(rating);
        p.setBadge(badge);
        p.setStockQuantity(stock);
        p.setAvailableColors(colors);
        return p;
    }
}
