package com.swp391.scms.ai.client;

import org.springframework.web.client.RestClient;

public class GeminiRestClient implements AiClient {

    private final String apiKey;
    private final String model;
    private final RestClient restClient;

    public GeminiRestClient(String apiKey, String model) {
        this.apiKey = apiKey;
        this.model = (model != null && !model.isBlank()) ? model : "gemini-1.5-flash";
        this.restClient = RestClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com/v1beta")
                .build();
    }

    @Override
    public String getProviderName() {
        return "gemini";
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
        return "{\"status\": \"success\", \"provider\": \"gemini\", \"model\": \"" + model + "\", \"content\": \"Gemini generated response for: " + userMessage + "\"}";
    }
}
