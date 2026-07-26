import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import os


def generate_attack_bar_chart(attack_counts,
                               output_path="attack_chart.png"):
    if not attack_counts:
        attack_counts = {"No Data Yet": 0}

    attack_types = list(attack_counts.keys())
    counts = list(attack_counts.values())

    fig, ax = plt.subplots(figsize=(10, 5))
    fig.patch.set_facecolor("#1a1a1a")
    ax.set_facecolor("#1a1a1a")

    bars = ax.barh(attack_types, counts,
                   color="#cc0000", edgecolor="#ff4444")

    for bar, count in zip(bars, counts):
        ax.text(
            bar.get_width() + 0.3,
            bar.get_y() + bar.get_height() / 2,
            str(count),
            va="center",
            color="white",
            fontsize=10,
            fontweight="bold"
        )

    ax.set_xlabel("Number of Attacks", color="white", fontsize=11)
    ax.set_title("Attack Breakdown by Type", color="white",
                 fontsize=14, fontweight="bold")
    ax.tick_params(colors="white")

    for spine in ax.spines.values():
        spine.set_edgecolor("#444444")

    ax.tick_params(axis="x", colors="white")
    ax.tick_params(axis="y", colors="white")

    plt.tight_layout()
    plt.savefig(output_path, dpi=150,
                bbox_inches="tight", facecolor="#1a1a1a")
    plt.close()

    print(f"Chart saved to: {output_path}")
    return output_path
