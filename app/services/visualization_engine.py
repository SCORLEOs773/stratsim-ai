import statistics


def generate_revenue_distribution(revenues):

    mean_revenue = statistics.mean(revenues)
    median_revenue = statistics.median(revenues)

    return {
        "mean_revenue": mean_revenue,
        "median_revenue": median_revenue,
        "data_points": revenues
    }


def generate_histogram_data(revenues, bins=10):

    min_val = min(revenues)
    max_val = max(revenues)

    bin_size = (max_val - min_val) / bins

    histogram = [0] * bins

    for value in revenues:
        index = int((value - min_val) / bin_size)

        if index == bins:
            index -= 1

        histogram[index] += 1

    bin_ranges = []

    for i in range(bins):
        start = min_val + i * bin_size
        end = start + bin_size

        bin_ranges.append({
            "range_start": start,
            "range_end": end,
            "count": histogram[i]
        })

    return bin_ranges