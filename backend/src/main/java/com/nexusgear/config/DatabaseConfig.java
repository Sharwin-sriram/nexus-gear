package com.nexusgear.config;

import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    private static final Logger log = LoggerFactory.getLogger(DatabaseConfig.class);

    @Value("${SPRING_DATASOURCE_URL:${DATABASE_URL:}}")
    private String rawUrl;

    @Value("${SPRING_DATASOURCE_USERNAME:sa}")
    private String defaultUsername;

    @Value("${SPRING_DATASOURCE_PASSWORD:}")
    private String defaultPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariDataSource ds = new HikariDataSource();

        if (rawUrl == null || rawUrl.isBlank()) {
            log.info("No external database URL configured. Using in-memory H2 database.");
            ds.setJdbcUrl("jdbc:h2:mem:nexusgeardb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL");
            ds.setUsername(defaultUsername);
            ds.setPassword(defaultPassword);
            ds.setDriverClassName("org.h2.Driver");
            return ds;
        }

        // Check if the URL is a cloud URI format (e.g. postgresql://user:pass@host:port/db)
        if (rawUrl.startsWith("postgres://") || rawUrl.startsWith("postgresql://") || rawUrl.contains("@")) {
            try {
                String cleanUrl = rawUrl.startsWith("jdbc:") ? rawUrl.substring(5) : rawUrl;
                // Standardize scheme to standard URI syntax if needed
                if (cleanUrl.startsWith("postgresql://")) {
                    cleanUrl = "postgres://" + cleanUrl.substring("postgresql://".length());
                }

                URI uri = URI.create(cleanUrl);

                String host = uri.getHost();
                int port = uri.getPort() == -1 ? 5432 : uri.getPort();
                String path = uri.getPath(); // includes leading slash

                String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
                if (uri.getQuery() != null && !uri.getQuery().isBlank()) {
                    jdbcUrl += "?" + uri.getQuery();
                }

                String username = defaultUsername;
                String password = defaultPassword;

                if (uri.getUserInfo() != null) {
                    String[] userParts = uri.getUserInfo().split(":", 2);
                    username = userParts[0];
                    if (userParts.length > 1) {
                        password = userParts[1];
                    }
                }

                log.info("Configured PostgreSQL DataSource connecting to host: {} on port: {}", host, port);
                ds.setJdbcUrl(jdbcUrl);
                ds.setUsername(username);
                ds.setPassword(password);
                ds.setDriverClassName("org.postgresql.Driver");
                return ds;

            } catch (Exception e) {
                log.error("Failed to parse database URI [{}]. Falling back to direct URL assignment.", rawUrl, e);
            }
        }

        // Direct standard JDBC URL assignment
        String finalUrl = rawUrl;
        if (!finalUrl.startsWith("jdbc:")) {
            finalUrl = "jdbc:" + finalUrl;
        }
        ds.setJdbcUrl(finalUrl);
        ds.setUsername(defaultUsername);
        ds.setPassword(defaultPassword);
        if (finalUrl.contains("postgresql")) {
            ds.setDriverClassName("org.postgresql.Driver");
        } else {
            ds.setDriverClassName("org.h2.Driver");
        }
        return ds;
    }
}
