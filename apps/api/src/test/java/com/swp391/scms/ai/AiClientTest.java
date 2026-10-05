package com.swp391.scms.ai;

import com.swp391.scms.ai.client.AiClient;
import com.swp391.scms.ai.client.AiClientConfig;
import com.swp391.scms.ai.client.MockAiClient;
import com.swp391.scms.ai.entity.AiRecommendationLog;
import com.swp391.scms.ai.repository.AiRecommendationLogRepository;
import com.swp391.scms.ai.service.AiRecommendationService;
import com.swp391.scms.users.MemberRepository;
import com.swp391.scms.users.entity.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AiClientTest {

    @Mock
    private AiRecommendationLogRepository recommendationLogRepository;

    @Mock
    private MemberRepository memberRepository;

    @Test
    @DisplayName("MockAiClient should return valid model name and non-empty response")
    void testMockAiClient() {
        AiClient client = new MockAiClient("mock-test-model");
        assertEquals("mock", client.getProviderName());
        assertEquals("mock-test-model", client.getModelName());

        String response = client.generate("system", "user input");
        assertNotNull(response);
        assertTrue(response.contains("Gợi ý"));
    }

    @Test
    @DisplayName("AiClientConfig should fallback to MockAiClient when apiKey is empty")
    void testAiClientConfigFallback() {
        AiClientConfig config = new AiClientConfig();
        ReflectionTestUtils.setField(config, "provider", "openai");
        ReflectionTestUtils.setField(config, "apiKey", "");
        ReflectionTestUtils.setField(config, "model", "gpt-4o-mini");

        AiClient client = config.aiClient();
        assertNotNull(client);
        assertEquals("mock", client.getProviderName());
    }

    @Test
    @DisplayName("AiRecommendationService should generate recommendation and save log")
    void testAiRecommendationService() {
        AiClient client = new MockAiClient();
        AiRecommendationService service = new AiRecommendationService(client, recommendationLogRepository, memberRepository);

        Member member = new Member();
        member.setUserId(1L);
        member.setMembershipCode("MBR-001");

        when(memberRepository.findById(1L)).thenReturn(Optional.of(member));
        when(recommendationLogRepository.save(any(AiRecommendationLog.class))).thenAnswer(i -> i.getArgument(0));

        String result = service.generateRecommendation(1L, "Hội viên muốn tăng cơ giảm mỡ");
        assertNotNull(result);
        verify(recommendationLogRepository).save(any(AiRecommendationLog.class));
    }
}
