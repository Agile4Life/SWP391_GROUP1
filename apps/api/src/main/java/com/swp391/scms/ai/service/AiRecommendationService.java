package com.swp391.scms.ai.service;

import com.swp391.scms.ai.client.AiClient;
import com.swp391.scms.ai.entity.AiRecommendationLog;
import com.swp391.scms.ai.repository.AiRecommendationLogRepository;
import com.swp391.scms.common.exception.ResourceNotFoundException;
import com.swp391.scms.users.MemberRepository;
import com.swp391.scms.users.entity.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class AiRecommendationService {

    private final AiClient aiClient;
    private final AiRecommendationLogRepository recommendationLogRepository;
    private final MemberRepository memberRepository;

    public AiRecommendationService(AiClient aiClient,
                                  AiRecommendationLogRepository recommendationLogRepository,
                                  MemberRepository memberRepository) {
        this.aiClient = aiClient;
        this.recommendationLogRepository = recommendationLogRepository;
        this.memberRepository = memberRepository;
    }

    public String generateRecommendation(Long memberId, String healthContext) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("resource.member", memberId));

        String systemPrompt = "Bạn là chuyên gia thể hình và sức khỏe tại Trung tâm Thể thao SCMS.";
        String userMessage = "Tạo gợi ý bài tập cho hội viên " + member.getMembershipCode() + ": " + healthContext;

        String response = aiClient.generate(systemPrompt, userMessage);

        AiRecommendationLog log = new AiRecommendationLog();
        log.setMember(member);
        log.setInputContext(healthContext != null ? healthContext : "{}");
        log.setRecommendedContent(response);
        log.setModelName(aiClient.getModelName());
        log.setApplied(false);
        log.setCreatedAt(LocalDateTime.now());

        if (recommendationLogRepository != null) {
            recommendationLogRepository.save(log);
        }

        return response;
    }

    public AiClient getAiClient() {
        return aiClient;
    }
}
