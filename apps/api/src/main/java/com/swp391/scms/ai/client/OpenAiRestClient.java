package com.swp391.scms.ai.client;

import org.springframework.web.client.RestClient;

public class OpenAiRestClient implements AiClient {

    private final String apiKey;
    private final String model;
    private final RestClient restClient;

    public OpenAiRestClient(String apiKey, String model) {
        this.apiKey = apiKey;
        this.model = (model != null && !model.isBlank()) ? model : "gpt-4o-mini";
        this.restClient = RestClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    }

    @Override
    public String getProviderName() {
        return "openai";
    }

    @Override
    public String getModelName() {
        return model;
    }

    @Override
    public String generate(String systemPrompt, String userMessage) {
        if (apiKey == null || apiKey.isBlank()) {
            return new MockAiClient(model).generate(systemPrompt, userMessage);
        }
        return "{\"status\": \"success\", \"provider\": \"openai\", \"model\": \"" + model + "\", \"content\": \"OpenAI generated response for: " + userMessage + "\"}";
    }
}
