import { RecommendationResponse } from '../../shared/models/base.model';
import { AggregatorService } from '../../shared/services/aggregator.service';
export declare class RecommendationComponent {
    aggregatorService: AggregatorService;
    data: RecommendationResponse;
    constructor(aggregatorService: AggregatorService);
    close(): void;
    search(all?: boolean): void;
}
